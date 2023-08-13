import classNames from 'classnames';

import './FormInput.scss';

const FormInput = ({
  name,
  variant,
  type,
  placeholder,
  value,
  changeHandler,
  label,
  error,
  onBlur,
  touched,
  disabled,
  uppercase,
  capitalize,
}) => {
  return (
    <div className={classNames('form-input', variant)}>
      <label htmlFor={name}>{label}</label>
      {error && touched && <p className="input-error">{error}</p>}
      <input
        className={`${error && touched && 'has-error'} ${
          uppercase && 'is-uppercase'
        } ${capitalize && 'is-capitalize'}`}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        autoComplete="off"
        onChange={changeHandler}
        name={name}
        onBlur={onBlur}
        id={name}
      />
    </div>
  );
};

export default FormInput;
