import classNames from 'classnames';
import './FormInput.scss';

const FormTextarea = ({
  name,
  type,
  placeholder,
  variant,
  value,
  changeHandler,
  label,
  error,
  onBlur,
  touched,
}) => {
  return (
    <div className={classNames('form-input', variant)}>
      <label htmlFor={name}>{label}</label>
      {error && touched && <p className="input-error">{error}</p>}
      <textarea
        className={error && touched && 'has-error'}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        name={name}
        id={name}
        onBlur={onBlur}
        rows="3"
      />
    </div>
  );
};

export default FormTextarea;
