import React from "react";
import {
  ImArrowDownLeft2,
  ImArrowDownRight2,
  ImArrowUpLeft2,
  ImArrowUpRight2,
} from "react-icons/im";

import { useSelector } from "react-redux";

import "./ExpandBtn.scss";

const ExpandBtn = ({ clickHandler }) => {
  const fullScreen = useSelector((state) => state.layout.fullScreen);

  return (
    <button
      onClick={clickHandler}
      className={`expand-btn ${fullScreen && "full-screen"}`}
    >
      <ImArrowDownLeft2 className="arrow arrow-dl" />
      <ImArrowDownRight2 className="arrow arrow-dr" />
      <ImArrowUpLeft2 className="arrow arrow-ul" />
      <ImArrowUpRight2 className="arrow arrow-ur" />
    </button>
  );
};

export default ExpandBtn;
