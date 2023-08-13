import React, { useState } from "react";
import A from "../Link/Link";

import { HiOutlineLockClosed } from "react-icons/hi";
import warning from "../../../assets/icons/warning.svg";

import "./Auth.scss";

const AuthInput = ({
  name,
  type,
  handleChange,
  value,
  icon,
  to,
  action,
  placeholder,
  className,
  onClick,
  error,
  formikName,
  handleBlur,
  touched,
}) => {
  const [show, setShow] = useState(type);

  const toggleType = () => {
    setShow(show === "text" ? "password" : "text");
  };

  return (
    <div className={`${className} auth-input`}>
      <div className="auth-input__label">
        <label htmlFor={name}>{name}</label>
        {action && <A to={to} name={action} />}
      </div>
      <div
        className={`auth-input__input ${error && "with-error"} ${
          !error && value.length > 0 && "with-success"
        }`}
      >
        {formikName ? (
          <input
            name={formikName ? formikName : name}
            id={name}
            type={show}
            value={value}
            onChange={handleChange}
            autoComplete="off"
            onBlur={handleBlur}
            placeholder={placeholder}
          />
        ) : (
          <input
            name={formikName ? formikName : name}
            id={name}
            type={show}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            autoComplete="off"
            placeholder={placeholder}
          />
        )}

        {icon && (
          <span className={`${value && "full-icon"}`} onClick={toggleType}>
            {show !== "password" ? icon : <HiOutlineLockClosed />}
          </span>
        )}
      </div>
      {error && (
        <div className="auth-input__error">
          <i>
            <img src={warning} alt="warning" />
          </i>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default AuthInput;
