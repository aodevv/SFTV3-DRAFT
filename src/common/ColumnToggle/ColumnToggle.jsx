import React, { useState } from "react";

import { useCloseOutside } from "../Hooks/useCloseOutside";

import { BsGearFill } from "react-icons/bs";

import "./ColumnToggle.scss";
import DropdownPortal from "./DropdownPortal";

const ColumnToggle = ({
  obj,
  position,
  exclude,
  right,
  visiHidden,
  header,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);
  const [x, setX] = useState("0");
  const [y, setY] = useState("0");
  // let btnRef = useRef();

  const handleClick = () => {
    const btnCoords = openRef.current.getBoundingClientRect();
    const { x, y } = btnCoords;
    setX(x);
    setY(y);

    setIsClose(!isClose);
  };

  const { allColumns } = obj;

  return (
    <div className={`column-toggle ${visiHidden && "hidden"}`}>
      <i ref={openRef} onClick={handleClick}>
        <BsGearFill />
      </i>

      <DropdownPortal
        position={position}
        isClose={isClose}
        menuRef={menuRef}
        right={right}
        exclude={exclude}
        allColumns={allColumns}
        header={header}
        x={x}
        y={y}
      />
    </div>
  );
};

export default ColumnToggle;
