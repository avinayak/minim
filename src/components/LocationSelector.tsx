import { useLazyQuery } from "@apollo/client";
import { Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { CitySearchDocument } from "../gql/graphql";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: "0px 24px",
  }),
  control: (provided, state) => ({
    ...provided,
    background: "#f7f7f9",
    borderRadius: 0,
    border: "none",
    padding: "4px 0px 4px 17px",
  }),
  menu: (provided) => ({
    ...provided,
    border: "1px solid",
    borderRadius: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#55595c",
    width: "31px",
    marginRight: "-6px",
  }),

  clearIndicator: (provided, state) => ({
    ...provided,
    display: "none",
  }),

  indicatorSeparator: (provided, state) => ({
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

export function LocationSelector({ onChange, city, label }) {
  const [queryCitySearch] = useLazyQuery(CitySearchDocument, {});

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      queryCitySearch({
        variables: {
          query: inputValue,
        },
        onCompleted: (data) => {
          const options = data.citySearch.map((city) => {
            const label = ` ${city.name}, ${city.country}`;
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
      <Form.Label>{label}</Form.Label>
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
