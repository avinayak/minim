import { widgetKeys, widgetKeyMap } from "../widgets/Widget";

export const WidgetPicker = ({ setDroppingWidgetData }) => {
  return (
    <div className="widgets-add">
      {widgetKeys.map((key, index) => (
        <div key={key}>
          <div
            className="droppable-widget-placeholder"
            draggable={true}
            unselectable="on"
            onDragStart={() => {
              setDroppingWidgetData({
                widget: {
                  widgetCode: key,
                },
                dropType: "ADD_WIDGET",
              });
            }}
          >
            {widgetKeyMap()[key].preview()}
          </div>
          {widgetKeyMap()[key].widgetCode}
          {index != widgetKeys.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};
