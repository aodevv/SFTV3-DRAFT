import React from "react";
import "./Toggle.scss";

const Toggle = ({ isActive, handleClick }) => {
  return (
    <div onClick={handleClick} className={`toggle ${isActive && "active"}`}>
      <span className="ball" />
      {isActive ? "Active" : "Inactive"}
    </div>
  );
};

export default Toggle;
