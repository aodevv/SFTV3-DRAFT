import { useRef, useEffect, useState } from 'react';

import AddColumnBtn from './AddColumnBtn';

const AddColumnContainer = ({
  id,
  activeHeader,
  tableHeight,
  addColumn,
  hide,
}) => {
  let btnRef = useRef();
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  useEffect(() => {
    const btnCoords = btnRef.current.getBoundingClientRect();
    const { right, y } = btnCoords;
    setX(right);
    setY(y);
  }, [activeHeader]);
  return (
    <div ref={btnRef} className="add-column-container">
      {activeHeader.active && activeHeader.id === id && !hide && (
        <AddColumnBtn
          addColumn={addColumn}
          tableHeight={tableHeight}
          x={x}
          y={y}
        />
      )}
    </div>
  );
};

export default AddColumnContainer;
