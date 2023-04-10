import { useWallpaper } from "./wallpaper/WallpaperContext";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const popover = ({ description, altDescription, username }) => (
  <Popover id="popover-basic">
    <Popover.Body>
      {description ? description + ": " + altDescription : altDescription}
      <br />
      <small>
        <div>by @{username}</div>
      </small>
    </Popover.Body>
  </Popover>
);

export function WallpaperInfoSpinner({}) {
  const { fetchStarted, meta } = useWallpaper();

  return (
    <span className="spinner">
      {meta && (
        <OverlayTrigger trigger={["focus", "hover"]} placement="top" overlay={popover(meta)}>
          <button
            onClick={() => window.open(meta.link, "_blank")}
            className="wallpaper-courtsey"
          >{`Image by ${meta.fullName}`}</button>
        </OverlayTrigger>
      )}

      {fetchStarted && (
        <span className="wobblebar-loader spinner-bar">Loading…</span>
      )}
    </span>
  );
}
