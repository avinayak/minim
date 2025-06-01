/**
 * Local Image Store
 * 
 * This module provides IndexedDB-based storage for local wallpaper images.
 * It's designed to replace localStorage for large image files to avoid
 * quota exceeded errors. Images are stored as Blobs in IndexedDB and
 * referenced by unique IDs.
 * 
 * Features:
 * - Store local image files in IndexedDB
 * - Retrieve images by ID and convert to base64 data URLs
 * - Automatic cleanup of old images to prevent storage bloat
 * - Error handling for storage operations
 */

// filepath: /Users/atul/lab/minim/src/wallpaper/local-image-store.ts
const LOCAL_DB_NAME = "localWallpaperDB";
const LOCAL_DB_VERSION = 1;
const LOCAL_IMAGE_STORE = "localImages";

interface LocalImageEntry {
  id: string;
  image: Blob;
  filename: string;
  uploadedAt: Date;
}

async function openLocalDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LOCAL_DB_NAME, LOCAL_DB_VERSION);

    request.onerror = (event: Event) => {
      reject("Error opening local image database");
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(LOCAL_IMAGE_STORE, { keyPath: "id" });
    };
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(`Error converting blob to base64: ${error}`);
    };
    reader.readAsDataURL(blob);
  });
}

export async function saveLocalImage(file: File): Promise<string> {
  const db = await openLocalDatabase();
  const imageId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const imageEntry: LocalImageEntry = {
    id: imageId,
    image: file,
    filename: file.name,
    uploadedAt: new Date()
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LOCAL_IMAGE_STORE, "readwrite");
    const store = transaction.objectStore(LOCAL_IMAGE_STORE);
    const request = store.add(imageEntry);

    request.onsuccess = () => {
      resolve(imageId);
    };

    request.onerror = () => {
      reject("Error saving local image to IndexedDB");
    };
  });
}

export async function getLocalImage(imageId: string): Promise<string> {
  const db = await openLocalDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LOCAL_IMAGE_STORE, "readonly");
    const store = transaction.objectStore(LOCAL_IMAGE_STORE);
    const request = store.get(imageId);

    request.onsuccess = async () => {
      const entry = request.result as LocalImageEntry;
      if (entry) {
        const base64 = await blobToBase64(entry.image);
        resolve(base64);
      } else {
        reject("Local image not found");
      }
    };

    request.onerror = () => {
      reject("Error retrieving local image from IndexedDB");
    };
  });
}

export async function deleteLocalImage(imageId: string): Promise<void> {
  const db = await openLocalDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LOCAL_IMAGE_STORE, "readwrite");
    const store = transaction.objectStore(LOCAL_IMAGE_STORE);
    const request = store.delete(imageId);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject("Error deleting local image from IndexedDB");
    };
  });
}

export async function listLocalImages(): Promise<LocalImageEntry[]> {
  const db = await openLocalDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LOCAL_IMAGE_STORE, "readonly");
    const store = transaction.objectStore(LOCAL_IMAGE_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject("Error listing local images from IndexedDB");
    };
  });
}

export async function cleanupOldImages(maxImages: number = 2): Promise<void> {
  const db = await openLocalDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(LOCAL_IMAGE_STORE, "readwrite");
    const store = transaction.objectStore(LOCAL_IMAGE_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const images = request.result as LocalImageEntry[];
      
      // Sort by upload date, oldest first
      images.sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime());
      
      // If we have more than maxImages, delete the oldest ones
      if (images.length > maxImages) {
        const imagesToDelete = images.slice(0, images.length - maxImages);
        let deletedCount = 0;
        
        imagesToDelete.forEach((image) => {
          const deleteRequest = store.delete(image.id);
          deleteRequest.onsuccess = () => {
            deletedCount++;
            if (deletedCount === imagesToDelete.length) {
              resolve();
            }
          };
          deleteRequest.onerror = () => {
            reject("Error deleting old image");
          };
        });
        
        if (imagesToDelete.length === 0) {
          resolve();
        }
      } else {
        resolve();
      }
    };

    request.onerror = () => {
      reject("Error listing images for cleanup");
    };
  });
}
