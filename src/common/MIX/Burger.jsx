import React from "react";
import "./Mix.scss";
const Burger = ({ toggle }) => {
  return (
    <div className="burger" onClick={() => toggle()}>
      <div className="burger__content"></div>
    </div>
  );
};

export default Burger;
