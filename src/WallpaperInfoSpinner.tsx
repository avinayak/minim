import { useWallpaper } from "./wallpaper/WallpaperContext";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Icon } from "@mdi/react";
import { mdiCamera, mdiMapMarker } from "@mdi/js";
import { camelCaseToSentenceCase } from "./utils";
import { Link } from "./components/Link";

const locationString = (location) => {
  if (!location) return "";
  const { city, country } = location;
  if (!city && !country) return "";
  return city && country ? `${city}, ${country}` : city ? city : country;
};

const popover = (meta) => {
  const { description, altDescription, username, exif, location } = meta;

  return (
    <Popover className="wallpaper-metadata">
      <Popover.Body>
        {description ? description + ": " + altDescription : altDescription}.
        <br />
        <small
          style={{
            textAlign: "right",
            display: "block",
            marginTop: "0.5rem",
          }}
        >
          <div>- by @{username} on Unsplash</div>
        </small>

        {location && (location.city || location.country) && (
          <>
            <br />
            <div>
              <Icon path={mdiMapMarker} size={1} />
              <div className="location-meta-text">
                {locationString(location)}
              </div>
            </div>
          </>
        )}

        {exif && exif.make && (
          <>
            <br />
            <div className="exif-meta">
              <Icon path={mdiCamera} size={1} />
              <table className="exif-table">
                <tbody>
                  {Object.keys(exif)
                    .filter((key) => key !== "__typename" && exif[key])
                    .map((key) => {
                      return (
                        <tr>
                          <td>{camelCaseToSentenceCase(key)}</td>
                          <td>{exif[key]}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Popover.Body>
    </Popover>
  );
};

export function WallpaperInfoSpinner({}) {
  const { fetchStarted, meta } = useWallpaper();
  return (
    <span className="spinner wallpaper-info">
      {meta && (
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="top"
          overlay={popover(meta)}
        >
          <span>
            <Link href={`${meta.link}?utm_source=minim&utm_medium=referral`}>Photo</Link>
            {" by "}
            <Link href={`${meta.userLink}?utm_source=minim&utm_medium=referral`}>{meta.fullName}</Link>
            {locationString(meta.location) &&
              ` (${locationString(meta.location)})`}
          </span>
        </OverlayTrigger>
      )}

      {fetchStarted && (
        <span className="wobblebar-loader spinner-bar">Loading…</span>
      )}
    </span>
  );
}
