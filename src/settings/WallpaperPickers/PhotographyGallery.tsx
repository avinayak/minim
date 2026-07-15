import { useApolloClient } from "@apollo/client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type UIEvent,
  type WheelEvent,
} from "react";
import {
  CategoryTypes,
  RandomImageQueryDocument,
  SourceTypes,
} from "../../gql/graphql";
import { addUnsplashScalingParams } from "../../utils";
import {
  type PhotographyImage,
  photographyImageMetadata,
  trackPhotographySelection,
} from "../../wallpaper/wallpaper";
import {
  cancelPendingWallpaperFetches,
  useWallpaper,
  useWallpaperDispatch,
} from "../../wallpaper/WallpaperContext";

const INITIAL_IMAGE_COUNT = 8;
const PAGE_SIZE = 4;
const LOAD_THRESHOLD = 48;
const CACHE_TTL = 60 * 60 * 1000;
const CACHE_LIMIT = 40;

function readCachedImages(category: string) {
  try {
    const value = localStorage.getItem(`photography-gallery:${category}`);
    if (!value) return [];
    const cached = JSON.parse(value) as {
      expiresAt: number;
      images: PhotographyImage[];
    };
    return cached.expiresAt > Date.now() && Array.isArray(cached.images)
      ? cached.images
      : [];
  } catch {
    return [];
  }
}

function cacheImages(category: string, images: PhotographyImage[]) {
  try {
    localStorage.setItem(
      `photography-gallery:${category}`,
      JSON.stringify({
        expiresAt: Date.now() + CACHE_TTL,
        images: images.slice(-CACHE_LIMIT),
      })
    );
  } catch {
    // The current gallery remains usable if storage is full or unavailable.
  }
}

export function PhotographyGallery({ category }: { category: string }) {
  const client = useApolloClient();
  const wallpaper = useWallpaper();
  const wallpaperDispatch = useWallpaperDispatch();
  const [images, setImages] = useState<PhotographyImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string>();
  const viewportRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<PhotographyImage[]>([]);
  const generationRef = useRef(0);
  const loadingRef = useRef(false);
  const abortRef = useRef<AbortController>();

  const loadImages = useCallback(
    async (count = PAGE_SIZE) => {
      if (loadingRef.current) return;

      const generation = generationRef.current;
      const signal = abortRef.current?.signal;
      loadingRef.current = true;
      setLoading(true);
      setLoadError(undefined);

      const knownIds = new Set(imagesRef.current.map(({ id }) => id));
      let newImages: PhotographyImage[] = [];
      let returnedImages = 0;

      for (let attempt = 0; attempt < 2 && newImages.length === 0; attempt += 1) {
        const requests = Array.from({ length: count }, () =>
          client.query({
            query: RandomImageQueryDocument,
            variables: {
              source: SourceTypes.Unsplash,
              query: category,
              category: CategoryTypes.Collection,
            },
            fetchPolicy: "no-cache",
            context: {
              queryDeduplication: false,
              fetchOptions: { signal },
            },
          })
        );
        const results = await Promise.allSettled(requests);
        if (generation !== generationRef.current) return;

        returnedImages = 0;
        newImages = results.flatMap((result) => {
          const image =
            result.status === "fulfilled"
              ? result.value.data.randomImage
              : null;
          if (!image) return [];
          returnedImages += 1;
          if (knownIds.has(image.id)) return [];
          knownIds.add(image.id);
          return [image];
        });

        if (returnedImages === 0) break;
      }

      if (newImages.length > 0) {
        imagesRef.current = [...imagesRef.current, ...newImages];
        cacheImages(category, imagesRef.current);
        setImages(imagesRef.current);
      } else {
        setLoadError(
          returnedImages === 0
            ? "Photos could not be loaded. Please try again."
            : "No new photos were returned. Please try again."
        );
      }

      loadingRef.current = false;
      setLoading(false);
    },
    [category, client]
  );

  useEffect(() => {
    generationRef.current += 1;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    loadingRef.current = false;
    setLoading(false);

    const cachedImages = readCachedImages(category);
    imagesRef.current = cachedImages;
    setImages(cachedImages);
    setLoadError(undefined);
    viewportRef.current?.scrollTo({ top: 0 });

    if (cachedImages.length < INITIAL_IMAGE_COUNT) {
      void loadImages(INITIAL_IMAGE_COUNT - cachedImages.length);
    }

    return () => {
      generationRef.current += 1;
      abortRef.current?.abort();
      loadingRef.current = false;
    };
  }, [category, loadImages]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (
      !loading &&
      !loadError &&
      images.length > 0 &&
      viewport &&
      viewport.scrollHeight <= viewport.clientHeight
    ) {
      void loadImages();
    }
  }, [images.length, loadError, loadImages, loading]);

  const loadNearBottom = (viewport: HTMLDivElement) => {
    const distanceFromBottom =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
    if (!loadError && distanceFromBottom <= LOAD_THRESHOLD) void loadImages();
  };

  const selectImage = (image: PhotographyImage) => {
    if (!image.urls?.full) return;

    cancelPendingWallpaperFetches();
    wallpaperDispatch({
      type: "UPDATE_WALLPAPER",
      payload: {
        ...wallpaper,
        wallpaperId: image.id,
        wallpaperCategory: category,
        background: `url('${addUnsplashScalingParams(image.urls.full)}')`,
        color: "white",
        meta: photographyImageMetadata(image),
        fetchStarted: false,
      },
    });
    trackPhotographySelection(image);
  };

  return (
    <div className="photography-gallery">
      <div className="photography-gallery__label">Choose a photo</div>
      <div
        className="photography-gallery__viewport"
        ref={viewportRef}
        onScroll={(event: UIEvent<HTMLDivElement>) =>
          loadNearBottom(event.currentTarget)
        }
        onWheel={(event: WheelEvent<HTMLDivElement>) => {
          if (event.deltaY > 0) loadNearBottom(event.currentTarget);
        }}
        aria-busy={loading}
      >
        <div className="photography-gallery__grid">
          {images.map((image) => {
            const selected = wallpaper.wallpaperId === image.id;
            return (
              <button
                type="button"
                className={`photography-gallery__thumbnail${
                  selected ? " photography-gallery__thumbnail--selected" : ""
                }`}
                key={image.id}
                onClick={() => selectImage(image)}
                aria-label={`Use ${
                  image.altDescription || image.description || "this photo"
                } as wallpaper`}
                aria-pressed={selected}
              >
                <img
                  src={image.urls?.thumb || image.urls?.full || ""}
                  alt=""
                  loading="lazy"
                />
                {selected && (
                  <span className="photography-gallery__selected-mark" aria-hidden>
                    &#10003;
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="photography-gallery__status" aria-live="polite">
          {loading && <span>Loading photos...</span>}
        </div>
        {loadError && (
          <div className="photography-gallery__error" role="status">
            <span>{loadError}</span>
            <button type="button" onClick={() => void loadImages()}>
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
