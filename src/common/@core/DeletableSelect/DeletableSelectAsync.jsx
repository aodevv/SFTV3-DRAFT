import { useState, useEffect } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';

import { components } from 'react-select';
import FormSelect from '@core/FormInput/FormSelect';
import {
  deleteFunction,
  postFunction,
} from '../../../redux/functionSlice/functionSlice';
import './styles.scss';

const { Option } = components;

const RemoveableOption = (props) => {
  const handleRemoveOption = () => {
    props.removeOption(props.data.label);
  };
  const isNew = true;

  if (isNew) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Option {...props}>{props.children}</Option>
        {props.deleting ? (
          <i className="select-loader-delete">
            <ImSpinner2 />
          </i>
        ) : (
          <span
            style={{ padding: '0 10px', cursor: 'pointer', display: 'flex' }}
            onClick={handleRemoveOption}
          >
            <RiDeleteBin5Line />
          </span>
        )}
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

const DeletableSelectAsync = ({
  options,
  formik,
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
  const [done, setDone] = useState(false);

  const removeOption = (optionValue) => {
    setDone(false);
    if (!deleting) {
      dispatch(deleteFunction(optionValue));
      const found = options.find((el) => el.value === value);
      if (found?.label === optionValue) {
        formik.setFieldValue(formikField, '');
      }
    }
  };

  const dispatch = useDispatch();
  const posting = useSelector((state) => state.function.posting);
  const deleting = useSelector((state) => state.function.deleting);
  const apiError = useSelector((state) => state.function.error);

  const customComponents = {
    Option: (props) => (
      <RemoveableOption
        {...props}
        deleting={deleting}
        removeOption={removeOption}
      />
    ),
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleCreateOption = (value) => {
    // const newOption = { label: value, value: value, new: true };
    // formik.setFieldValue(formikField, value);
    setInputValue('');
    const found = options.find((el) => el.label === value);
    if (found) {
      formik.setFieldValue(formikField, found.value);
    } else {
      dispatch(postFunction(value));
      setDone(true);
    }
    // setSelectOptions([...options, newOption]);
  };

  const onCreateOptionKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateOption(inputValue);
    }
  };

  //   useEffect(() => {
  //     if (edit) {
  //       handleCreateOption(value);
  //     }
  //   }, []);

  useEffect(() => {
    if (!posting && done && !error) {
      const lastElement = options[options.length - 1];
      formik.setFieldValue(formikField, lastElement.value);
    }
  }, [done, posting, apiError, options]);

  useEffect(() => {
    console.log(options);
    console.log(value);
    setSelectOptions(options);
  }, [options]);

  return posting ? (
    <div className="select-loader">
      <i>
        <ImSpinner2 />
      </i>
    </div>
  ) : (
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

export default DeletableSelectAsync;
