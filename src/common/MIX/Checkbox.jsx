import React, { useState } from "react";

import "./Mix.scss";

const Checkbox = ({ id, element }) => {
  const [visibile, setVisibile] = useState(element.isVisible);

  const toggleHidden = () => {
    setVisibile(!visibile);
    element.toggleHidden(visibile);
  };

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={visibile}
        onChange={toggleHidden}
      />
      <label htmlFor={id}>{id.split("_").join(" ")}</label>
    </div>
  );
};

export default Checkbox;
