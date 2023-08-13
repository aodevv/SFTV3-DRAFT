import React from "react";

import Add from "../../../assets/add.svg";

import "./AddCard.scss";

const AddCard = ({ handleClick, width, height, icon, text }) => {
  return (
    <div
      onClick={handleClick}
      className="add-card"
      style={{ width: width, height: height }}
    >
      <i className="add-outer">
        {icon}
        <i className="add-inner">
          <img src={Add} alt="Your SVG" />
        </i>
      </i>
      <p>{text}</p>
    </div>
  );
};

export default AddCard;
