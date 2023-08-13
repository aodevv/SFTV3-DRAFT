import React from "react";

import { ImSpinner2 } from "react-icons/im";

import "./Btn.scss";

const Btn = ({
  clickHandler,
  text,
  color,
  size,
  type,
  isLoading,
  sent,
  confirmMsg,
}) => {
  return (
    <div className={`${size} btn`}>
      <button onClick={clickHandler} type={type} className={`${color}`}>
        {isLoading ? (
          <i className="btn__loader">
            <ImSpinner2 />
          </i>
        ) : sent ? (
          <div className="btn__sent">
            {" "}
            <i>
              <HiCheckCircle />
            </i>{" "}
            {confirmMsg}
          </div>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default Btn;
