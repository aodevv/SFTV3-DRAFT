import { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { components } from 'react-select';
import FormSelect from '@core/FormInput/FormSelect';

const { Option } = components;

const RemoveableOption = (props) => {
  const { data } = props;
  const handleRemoveOption = () => {
    props.removeOption(props.data.value);
  };

  if (true) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Option {...props}>{props.children}</Option>
        <span
          style={{ padding: '0 10px', cursor: 'pointer', display: 'flex' }}
          onClick={handleRemoveOption}
        >
          <RiDeleteBin5Line />
        </span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Option {...props}>{props.children}</Option>
      </div>
    );
  }
};

const DeletableSelect = ({
  options,
  formik,
  existingValue,
  edit,
  formikField,
  value,
  changeHandler,
  name,
  error,
  onBlur,
  touched,
  placeholder,
  label,
  position,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectOptions, setSelectOptions] = useState(options);
  const removeOption = (optionValue) => {
    setSelectOptions((prevSelectOptions) =>
      prevSelectOptions.filter((option) => option.value !== optionValue)
    );
  };

  const customComponents = {
    Option: (props) => (
      <RemoveableOption {...props} removeOption={removeOption} />
    ),
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleCreateOption = (value) => {
    const newOption = { label: value, value: value, new: true };
    formik.setFieldValue(formikField, value);
    setInputValue('');
    setSelectOptions([...options, newOption]);
  };

  const onCreateOptionKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateOption(inputValue);
    }
  };

  useEffect(() => {
    if (edit) {
      handleCreateOption(value);
    }
  }, []);

  useEffect(() => {
    setSelectOptions(options);
  }, [options]);

  return (
    <FormSelect
      label={label}
      placeholder={placeholder}
      name={name}
      position={position}
      options={selectOptions}
      inputValue={inputValue}
      handleCreateOption={handleCreateOption}
      onCreateOptionKeyDown={onCreateOptionKeyDown}
      onInputChange={handleInputChange}
      value={value}
      changeHandler={changeHandler}
      error={error}
      onBlur={onBlur}
      touched={touched}
      components={customComponents}
    />
  );
};

export default DeletableSelect;
