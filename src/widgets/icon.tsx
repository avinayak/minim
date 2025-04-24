import {LabelledTextInput} from "../components/LabelledTextInput";
import {WidgetType} from "../types";
import {useGridLayoutDispatch} from "./GridLayoutContext";
import Icon from '@mdi/react';
import * as mdi from '@mdi/js';

export const iconWidget: WidgetType = {
  widgetCode: "icon",
  widgetName: "Icon",
  initialState: () => ({
    widgetCode: "icon",
    fontSize: 2,
    borderStyle: "none",
    url: "https://www.google.com",
    icon: "google",
  }),
  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();

    return (
      <>
        <LabelledTextInput
          label="URL"
          value={widget.url}
          onChange={(url) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                url,
              },
            });
          }}
        />
        <LabelledTextInput
          label={
            <>
              MDI icon name —&nbsp;
              <a
                href="https://pictogrammers.com/library/mdi/"
                target="_blank"
                rel="noopener noreferrer"
                style={{textDecoration: "underline", color: "#007bff"}}
              >
                browse icons
              </a>
            </>
          }
          value={widget.icon}
          onChange={(icon) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                icon,
              },
            });
          }}
        />
      </>
    );
  },
  renderWidget: (widget, _, unlocked) =>
    <IconWidgetBody
      link={widget.url}
      icon={widget.icon}
      fontSize={widget.fontSize}
    />,
  preview: (widget) => {
    return (
      <div>
        <div style={{fontSize: "40px"}}>
          <Icon path={mdi.mdiGoogle} size={2}/>
        </div>
      </div>
    );
  },
};

function getMdiIconPath(iconName: string) {
  if (!iconName) return mdi.mdiHelp;

  const formattedName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return mdi[`mdi${formattedName}`] || mdi.mdiHelp;
}

function IconWidgetBody({link, icon, fontSize}) {
  const iconPath = getMdiIconPath(icon);

  return (
    <div>
      <a
        style={{
          textDecoration: "none",
          all: "unset",
          color: "inherit",
          cursor: "pointer",
        }}
        href={link}
        rel="noopener noreferrer"
      >
        <span
          style={{
            fontSize: fontSize / 1.4 + "rem",
            whiteSpace: "pre",
            lineHeight: "100%",
          }}
        >
          <Icon path={iconPath} size={fontSize}/>
        </span>
      </a>
    </div>
  );
}
