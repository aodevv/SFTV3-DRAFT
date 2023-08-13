import React from "react";

import { ImSpinner2 } from "react-icons/im";

import "./CardContainer.scss";
import Toggle from "../@core/Toggle/Toggle";

const CardContainer = ({ children, width, status, handleUpdate, loader }) => {
  return (
    <div className="card-container" style={{ width: width && width }}>
      <div className={`card-container__body`}>
        {/* <div className="card-container__body-content">
          <p className="title">Type: </p>
          <p className="content">Annualy</p>
        </div> */}
        {children}
      </div>
      <div className="card-container__footer">
        <div className="toggle-active">
          <span className="toggle-active__spinner">
            {loader && <ImSpinner2 />}
          </span>
          <Toggle isActive={status} handleClick={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
