import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { LabelledSelector } from "../components/LabelledSelector";
import { LabelledTextInput } from "../components/LabelledTextInput";
import { LocationSelector } from "../components/LocationSelector";
import { TwoLineWidget } from "../components/TwoLineWidget";
import { WeatherDocument } from "../gql/graphql";
import { WidgetType } from "../types";
import { capitalizeFirstLetter } from "../utils";
import { useGridLayoutDispatch } from "./GridLayoutContext";

const updateInterval = 1000 * 60 * 30;

const temperatureUnits = {
  C: "Celsius",
  F: "Fahrenheit",
};

const kelvinToCF = (kelvin: number, unit: string) => {
  const celsius = kelvin - 273.15;
  const fahrenheit = (celsius * 9) / 5 + 32;
  return Math.round(unit === "C" ? celsius : fahrenheit);
};

export const weatherWidget: WidgetType = {
  widgetCode: "weather",
  widgetName: "Weather",
  initialState: () => ({
    widgetCode: "weather",
    fontSize: 4,
    borderStyle: "none",
    temperature: 293,
    weatherCondition: "Snowy",
    tempraureUnit: "C",
    subText: "Vancouver",
    display: "temperature_and_condition",
    city: {
      name: "Vancouver",
      country: "Canada",
      lat: 49.2827,
      lon: -123.1207,
    },
  }),
  settingsForm: (widget) => {
    const dispatch = useGridLayoutDispatch();

    return (
      <>
        <LabelledTextInput
          label="Sub Text"
          value={widget.subText}
          onChange={(subText) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                subText,
              },
            });
          }}
        />

        <LabelledSelector
          label="Temperature Unit"
          options={Object.entries(temperatureUnits).map(([value, label]) => ({
            value,
            label,
          }))}
          value={widget.tempraureUnit}
          onChange={(tempraureUnit) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                tempraureUnit,
              },
            });
          }}
        />

        <LabelledSelector
          label="Display"
          options={[
            {
              label: "Temperature and Condition",
              value: "temperature_and_condition",
            },
            { label: "Temperature", value: "temperature" },
            { label: "Condition", value: "condition" },
          ]}
          value={widget.display}
          onChange={(display) => {
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                display,
              },
            });
          }}
        />

        <LocationSelector
          label="Location"
          city={widget.city}
          onChange={(city) => {
            localStorage.setItem(`${widget.id}-nextUpdate`, "0");
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                city,
                subText: city.name,
              },
            });
          }}
        />
      </>
    );
  },
  renderWidget: (widget, tick) => {
    const dispatch = useGridLayoutDispatch();

    const [weatherQuery] = useLazyQuery(WeatherDocument);

    const nextUpdate = parseInt(
      localStorage.getItem(`${widget.id}-nextUpdate`) || "0"
    );

    useEffect(() => {
      if (tick > nextUpdate) {
        localStorage.setItem(
          `${widget.id}-nextUpdate`,
          `${tick + updateInterval}`
        );

        weatherQuery({
          variables: {
            lat: widget.city.lat,
            lon: widget.city.lon,
          },
          onCompleted: (data) => {
            const weather = data.weather;
            dispatch({
              type: "UPDATE_WIDGET",
              payload: {
                ...widget,
                temperature: weather.temp,
                weatherCondition: weather?.descriptionAlt,
              },
            });
          },
        });
      }
    }, [tick]);

    const convertedTemp = kelvinToCF(widget.temperature, widget.tempraureUnit);
    const condition = capitalizeFirstLetter(widget.weatherCondition);

    const weatherText = createWeatherText(
      widget.display,
      convertedTemp,
      condition
    );

    return (
      <TwoLineWidget
        text={weatherText}
        fontSize={widget.fontSize}
        subText={widget.subText}
      />
    );
  },
  preview: (widget) => (
    <div>
      <div style={{ fontSize: "25px" }}>9° Snow</div>
    </div>
  ),
};

const createWeatherText = (
  display: string,
  temp: number,
  condition: string
) => {
  switch (display) {
    case "temperature_and_condition":
      return `${temp}° ${condition}`;
    case "temperature":
      return `${temp}°`;
    case "condition":
      return condition;
  }
};
