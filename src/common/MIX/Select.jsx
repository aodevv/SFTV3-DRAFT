import React from "react";

import { BiChevronDown } from "react-icons/bi";

import "./Mix.scss";

const Select = ({ name, options, label }) => {
  return (
    <div className="select">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name}>
        {options &&
          options.map((option, id) => {
            return (
              <option value={option} key={`options-${id}`}>
                {option.toUpperCase()}
              </option>
            );
          })}
      </select>
      <i>
        <BiChevronDown />
      </i>
    </div>
  );
};

export default Select;
