import React from "react";
import { Link } from "react-router-dom";
import "./Link.scss";

const A = ({ to, name }) => {
  return (
    <Link className="link" to={to}>
      {name}
    </Link>
  );
};

export default A;
