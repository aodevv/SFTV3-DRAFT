import React from 'react';

import Select from 'react-select';

import './FormInput.scss';

const FormSelect = ({
  name,
  placeholder,
  value,
  changeHandler,
  label,
  position,
  defaultValue,
  options,
  error,
  onBlur,
  touched,
  onInputChange,
  handleCreateOption,
  inputValue,
  onCreateOptionKeyDown,
  components,
  removeOption,
}) => {
  const setValue = (options, value) => {
    if (options) {
      const option = options.find((option) => option.value === value);
      return option ? option : '';
    } else {
      return '';
    }
  };
  return (
    <div className={`${error && touched && 'select-error'} form-select`}>
      <label htmlFor={name}>{label}</label>
      {error && touched && <p className="select-error">{error}</p>}
      <Select
        name={name}
        id={name}
        menuPlacement={position}
        maxMenuHeight={200}
        placeholder={placeholder}
        options={options}
        onBlur={onBlur}
        onInputChange={onInputChange}
        onCreateOption={handleCreateOption}
        onKeyDown={onCreateOptionKeyDown}
        inputValue={inputValue}
        value={setValue(options, value)}
        onChange={(selectedOption) => changeHandler(selectedOption)}
        removeOption={removeOption}
        components={components}
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: '46px',
            cursor: 'pointer',
          }),
          option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            backgroundColor: state.isSelected ? '#b9cad5' : 'white',
            color: state.isSelected ? 'white' : 'black',
            transition: 'all 200ms ease',
            '&:hover': {
              backgroundColor: '#b9cad5ae',
            },
          }),
        }}
      />
    </div>
  );
};

export default FormSelect;
