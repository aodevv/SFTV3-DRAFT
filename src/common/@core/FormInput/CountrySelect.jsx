import React, { useEffect, useRef, useState } from "react";

import Select from "react-select";

import {
  allCountryPhoneCodes,
  countries,
  codeToCountry,
} from "../utils/objects";

import "./CountrySelect.scss";

const url = "http://purecatamphetamine.github.io/country-flag-icons/3x2/";

const optionss = Object.keys(allCountryPhoneCodes).map((key) => {
  const phoneCode = allCountryPhoneCodes[key];
  return {
    code: key,
    value: key,
    country: `${countries[key]}`,
    label: (
      <div className="phone-flag">
        <div className="phone-flag__img">
          <img src={`${url}${key}.svg`} />
        </div>
        <div className="phone-code">{`${countries[key]}`}</div>
      </div>
    ),
  };
});

const CountrySelect = ({
  placeholder,
  selectValue,
  selectName,
  label,
  position,
  error,
  touched,
  selectChangeHandler,
}) => {
  const setValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  const [countryCode, setCountryCode] = useState(selectValue);

  useEffect(() => {
    if (selectValue) {
      setCountryCode(selectValue);
      // clearInput();
    }
  }, [selectValue]);

  return (
    <div className={`${error && "select-error"} country-select`}>
      <label htmlFor={selectName}>{label}</label>
      {error && touched && <p className="select-error">{error}</p>}
      <div className="country-select__inputs">
        <Select
          menuPlacement={position}
          maxMenuHeight={200}
          name={selectName}
          options={optionss}
          placeholder={placeholder}
          value={setValue(optionss, selectValue)}
          getOptionValue={(option) => option.country}
          onChange={(selectedOption) => selectChangeHandler(selectedOption)}
          classNamePrefix="react-select"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: "46px",
              cursor: "pointer",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default CountrySelect;
