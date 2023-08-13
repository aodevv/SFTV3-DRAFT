import React from "react";

import { FiSearch } from "react-icons/fi";

import "./Mix.scss";

const Search = ({ value, handleChange, placeholder }) => {
  return (
    <div className="search-input">
      <i>
        <FiSearch />
      </i>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
