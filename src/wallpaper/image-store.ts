const DB_NAME = "imageDB";
const DB_VERSION = 1;
const IMAGE_STORE = "images";

interface ImageEntry {
  id: number;
  image: Blob;
  metadata?: any;
  viewed?: boolean;
}

async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event: Event) => {
      reject("Error opening database");
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(IMAGE_STORE, { keyPath: "id", autoIncrement: true });
    };
  });
}

async function downloadImage(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.blob();
}

async function saveImage(
  db: IDBDatabase,
  imageBlob: Blob,
  metadata
): Promise<void> {
  const imageStore = db
    .transaction(IMAGE_STORE, "readwrite")
    .objectStore(IMAGE_STORE);
  const getAllRequest = imageStore.getAll();
  await new Promise<void>((resolve, reject) => {
    getAllRequest.onsuccess = (event: Event) => {
      const images = (event.target as IDBRequest<[ImageEntry]>).result;
      if (images.length >= 3) {
        const deleteRequest = imageStore.delete(images[0].id);
        deleteRequest.onsuccess = () => {};
        deleteRequest.onerror = (error: Event) => {
          reject(`Error deleting image: ${error}`);
        };
      }
      resolve();
    };
    getAllRequest.onerror = (error: Event) => {
      reject(`Error getting images: ${error}`);
    };
  });

  const addRequest = imageStore.add({
    image: imageBlob,
    metadata: metadata,
    viewed: false,
  });
  await new Promise<void>((resolve, reject) => {
    addRequest.onsuccess = () => {
      resolve();
    };
    addRequest.onerror = (error: Event) => {
      reject(`Error saving image: ${error}`);
    };
  });
}

export async function storeImage(url: string, metadata): Promise<void> {
  const db = await openDatabase();
  const imageBlob = await downloadImage(url);
  await saveImage(db, imageBlob, metadata);
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(`Error converting blob to base64: ${error}`);
    };
    reader.readAsDataURL(blob);
  });
}

export async function fetchLatestImage(): Promise<string> {
  const db = await openDatabase();
  const getAllRequest = db
    .transaction(IMAGE_STORE, "readonly")
    .objectStore(IMAGE_STORE)
    .getAll();
  return new Promise((resolve, reject) => {
    getAllRequest.onsuccess = (event: Event) => {
      const images = (event.target as IDBRequest<[ImageEntry]>).result;
      if (images.length > 0) {
        blobToBase64(images[images.length - 1].image).then((base64) => {
          resolve(base64 as string);
        });
      } else {
        reject("No images found");
      }
    };
    getAllRequest.onerror = (error: Event) => {
      reject(`Error fetching images: ${error}`);
    };
  });
}

export function doesStoreHaveUnviewedImages(): Promise<boolean> {
  return new Promise((resolve) => {
    openDatabase().then((db) => {
      const getAllRequest = db
        .transaction(IMAGE_STORE, "readonly")
        .objectStore(IMAGE_STORE)
        .getAll();
      getAllRequest.onsuccess = (event: Event) => {
        const images = (event.target as IDBRequest<[ImageEntry]>).result;
        if (images.length > 0) {
          const unviewedImages = images.filter((image) => !image.viewed);
          resolve(unviewedImages.length > 0);
        } else {
          resolve(false);
        }
      };
      getAllRequest.onerror = (error: Event) => {
        resolve(false);
      };
    });
  });
}