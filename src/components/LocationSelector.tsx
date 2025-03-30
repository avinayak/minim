import { useLazyQuery } from "@apollo/client";
import { Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { City, CitySearchDocument } from "../gql/graphql";

const customStyles = {
  option: (provided: { [x: string]: string }) => ({
    ...provided,
    padding: "0px 24px",
  }),
  control: (provided: { [x: string]: string }) => ({
    ...provided,
    background: "#f7f7f9",
    borderRadius: 0,
    border: "none",
    padding: "4px 0px 4px 17px",
  }),
  menu: (provided: { [x: string]: string }) => ({
    ...provided,
    border: "1px solid",
    borderRadius: 0,
  }),
  dropdownIndicator: (provided: { [x: string]: string }) => ({
    ...provided,
    color: "#55595c",
    width: "31px",
    marginRight: "-6px",
  }),

  clearIndicator: (provided: { [x: string]: string }) => ({
    ...provided,
    display: "none",
  }),

  indicatorSeparator: (provided: { [x: string]: string }) => ({
    ...provided,
    display: "none",
  }),
};

const cityToOption = (city) => {
  const label = ` ${city.name}, ${city.country}`;
  return {
    label,
    value: JSON.stringify(city),
  };
};

export function LocationSelector({
  onChange,
  city,
  label,
}: {
  onChange: (value: string) => void;
  city: City;
  label: string;
}) {
  const [queryCitySearch] = useLazyQuery(CitySearchDocument, {});
  const loadOptions = (
    inputValue: string,

    callback: (options: { label: string; value: string }[]) => void
  ) => {
    if (inputValue.length > 1) {
      queryCitySearch({
        variables: {
          query: inputValue,
        },
        onCompleted: (data) => {
          const options = data?.citySearch?.map((city) => {
            const label = `${city && city.name}, ${city && city.country}`;
            return {
              label,
              value: JSON.stringify(city),
            };
          });
          callback(options);
        },
      });
    } else {
      callback([]);
    }
  };

  const handleInputChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      onChange(JSON.parse(newValue.value));
    } else {
      return newValue;
    }
  };

  return (
    <div>
      <Form.Label style={{userSelect: "none"}}>{label}</Form.Label>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        value={cityToOption(city)}
        onChange={handleInputChange}
        styles={customStyles}
      />
    </div>
  );
}
