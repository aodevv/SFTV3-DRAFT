import React from "react";
import {
  ImArrowDownLeft2,
  ImArrowDownRight2,
  ImArrowUpLeft2,
  ImArrowUpRight2,
} from "react-icons/im";

import "./Mix.scss";

const ExpandBtn = () => {
  return (
    <button className="expand-btn">
      <ImArrowDownLeft2 className="arrow arrow-dl" />
      <ImArrowDownRight2 className="arrow arrow-dr" />
      <ImArrowUpLeft2 className="arrow arrow-ul" />
      <ImArrowUpRight2 className="arrow arrow-ur" />
    </button>
  );
};

export default ExpandBtn;
