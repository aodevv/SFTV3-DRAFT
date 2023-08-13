import React from "react";

import "./Paper.scss";

const Paper = ({ children, className }) => {
  return <div className={`${className} paper`}>{children}</div>;
};

export default Paper;
