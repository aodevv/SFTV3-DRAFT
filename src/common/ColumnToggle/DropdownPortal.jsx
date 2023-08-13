import React from "react";
import ReactDom from "react-dom";

import Dropdown from "../Dropdown/Dropdown";
import Checkbox from "../MIX/Checkbox";

const DropdownPortal = ({
  position,
  isClose,
  menuRef,
  allColumns,
  ppes,
  header,
  exclude,
  x,
  y,
}) => {
  return ReactDom.createPortal(
    <Dropdown
      className={`column-dd ${position && position}`}
      isClose={isClose}
      menuRef={menuRef}
      //   right={-1 * x}
      left={position === "left" ? x - 130 : x + 25}
      portal
      top={y - 15}
    >
      <li>
        <p>Select columns to display</p>
      </li>
      {allColumns
        .filter((el) => !exclude.includes(el.id))
        .map((element) => {
          let ppeName;
          if (ppes) {
            const foundPPe = ppes.find((ppe) => ppe.ppe_id === element.id);
            ppeName = foundPPe?.name ? foundPPe.name : "";
          }
          return (
            <li key={element.id}>
              <Checkbox
                id={!header ? ppeName : element.Header}
                element={element}
              />
            </li>
          );
        })}
    </Dropdown>,
    document.getElementById("table")
  );
};

export default DropdownPortal;
