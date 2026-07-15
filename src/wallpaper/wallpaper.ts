import { RandomImageQueryQuery } from "../gql/graphql";

export type PhotographyImage = NonNullable<
  RandomImageQueryQuery["randomImage"]
>;

export function photographyImageMetadata(image: PhotographyImage) {
  return image.links
    ? {
        link: image.links.download?.split("/").slice(0, -1).join("/"),
        fullName: image.user?.lastName
          ? `${image.user?.firstName || ""} ${image.user.lastName}`.trim()
          : image.user?.firstName?.trim(),
        description: image.description,
        altDescription: image.altDescription,
        username: image.user?.username,
        color: image.color,
        exif: image.exif,
        location: image.location,
        userLink: image.user?.links?.html,
      }
    : undefined;
}

export function trackPhotographySelection(image: PhotographyImage) {
  if (!image.links?.download) return;

  // The current backend exposes Unsplash's public download URL rather than
  // the authenticated download_location endpoint.
  void fetch(image.links.download, {
    mode: "no-cors",
    cache: "no-store",
  }).catch(() => {
    // Tracking must never prevent the user from selecting a wallpaper.
  });
}
