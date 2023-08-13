import React, { useEffect, useRef, useState } from 'react';

import Select from 'react-select';

import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.i18n';

import {
  allCountryPhoneCodes,
  countries,
  codeToCountry,
} from '../utils/objects';

import './FormInput.scss';

const url = 'http://purecatamphetamine.github.io/country-flag-icons/3x2/';

const optionss = Object.keys(allCountryPhoneCodes).map((key) => {
  const phoneCode = allCountryPhoneCodes[key];
  return {
    code: key,
    value: phoneCode,
    country: `${countries[key]}`,
    label: (
      <div className="phone-flag">
        <div className="phone-flag__img">
          <img src={`${url}${key}.svg`} />
        </div>
        <div className="phone-code">{`${countries[key]} (${phoneCode})`}</div>
      </div>
    ),
  };
});

const FormPhoneSelect = ({
  placeholder,
  selectValue,
  inputValue,
  changeHandler,
  inputName,
  selectName,
  label,
  position,
  type,
  errors,
  touched,
  selectChangeHandler,
  clearInput,
  disabled,
}) => {
  const setValue = (options, value) => {
    return options ? options.find((option) => option.code === value) : '';
  };

  const [countryCode, setCountryCode] = useState(selectValue);

  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (selectValue) {
      setCountryCode(selectValue);
      // clearInput();
    }
  }, [selectValue]);

  return (
    <div
      className={`${
        errors.phoneCode && touched.phoneCode && 'select-error'
      } form-phone-select`}
    >
      <label htmlFor={inputName}>{label}</label>
      {errors.phoneNum && touched.phoneNum && (
        <p className="select-error">{errors.phoneNum}</p>
      )}
      {!errors.phoneNum && errors.phoneCode && touched.phoneCode && (
        <p className="select-error">{errors.phoneCode}</p>
      )}
      <div className="form-phone-select__inputs">
        <Select
          menuPlacement={position}
          maxMenuHeight={200}
          name={selectName}
          options={optionss}
          placeholder=""
          isDisabled={disabled}
          value={setValue(optionss, selectValue)}
          getOptionValue={(option) => option.country}
          onChange={(selectedOption) => selectChangeHandler(selectedOption)}
          classNamePrefix="react-select"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: '46px',
              cursor: 'pointer',
            }),
          }}
        />
        <Cleave
          className={`${
            errors.phoneNum && touched.phoneNum && 'input-error'
          } form-phone-select__input`}
          placeholder={placeholder}
          type="tel"
          name={inputName}
          id={inputName}
          options={{ phone: true, phoneRegionCode: countryCode }}
          value={inputValue}
          onChange={changeHandler}
          disabled={selectValue && !disabled ? false : true}
          ref={phoneInputRef}
        />
      </div>
    </div>
  );
};

export default FormPhoneSelect;
