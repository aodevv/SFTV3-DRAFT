import React from "react";

import Select from "react-select";

import "./FormImgSelect.scss";

const customStyles = {
  clearIndicator: (provided, state) => ({
    ...provided,
    color: "red",
  }),
};

const FormImgSelect = ({
  name,
  placeholder,
  value,
  changeHandler,
  label,
  position,
  options,
  error,
  onBlur,
  touched,
  styles,
  height,
  className,
  smallImg,
  clearable,
}) => {
  const optionsImg = Object.keys(options).map((key) => {
    const { value, label, name } = options[key];
    return {
      value,
      name,
      label: (
        <div className={`select-img ${smallImg && "small"}`}>
          <img src={label} alt="companyImg" />
        </div>
      ),
    };
  });

  const setValue = (optionsImg, value) => {
    return optionsImg
      ? optionsImg.find((option) => option.value === value)
      : "";
  };

  const filterOption = (option, inputValue) => {
    const {
      data: { name },
    } = option;

    return name.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <div className={`${error && touched && "select-error"} form-img-select`}>
      {label && (
        <>
          {" "}
          <label htmlFor={name}>{label}</label>
          {error && touched && <p className="select-error">{error}</p>}
        </>
      )}

      <Select
        name={name}
        id={name}
        className={className}
        menuPlacement={position}
        maxMenuHeight={height ? height : 200}
        placeholder={placeholder}
        options={optionsImg}
        onBlur={onBlur}
        // filterOption={filterOption}
        getOptionValue={(option) => option.name}
        value={setValue(optionsImg, value)}
        onChange={(selectedOption) => changeHandler(selectedOption)}
        classNamePrefix="react-select"
        isClearable={clearable}
        styles={
          styles
            ? styles
            : {
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  height: "46px",
                  cursor: "pointer",
                }),
                option: (provided, state) => ({
                  ...provided,
                  cursor: "pointer",
                  backgroundColor: state.isSelected ? "#42a4df" : "white",
                  color: state.isSelected ? "white" : "black",
                  transition: "all 200ms ease",
                  "&:hover": {
                    backgroundColor: "#70b1daaf",
                  },
                }),
              }
        }
      />
    </div>
  );
};

export default FormImgSelect;
