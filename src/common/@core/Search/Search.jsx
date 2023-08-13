import React from "react";

import { CiSearch } from "react-icons/ci";
import "./Search.scss";

const Search = ({ handleChange, value, placeholder }) => {
  return (
    <div className="search">
      <i className="search__icon">
        <CiSearch />
      </i>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
