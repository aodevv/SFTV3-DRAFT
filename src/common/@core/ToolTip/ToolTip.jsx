import { useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';

import { useCloseOutside } from '../../Hooks/useCloseOutside';
import ToolTipPortal from './ToolTipPortal';

import './ToolTip.scss';

const ToolTip = ({ desc }) => {
  const [isClose, setIsClose] = useState(true);
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);

  const handleClick = () => {
    const btnCoords = openRef.current.getBoundingClientRect();
    const { x, y } = btnCoords;
    setX(x);
    setY(y);
    setIsClose(!isClose);
  };

  return (
    <div className="tooltip__wrapper">
      <div ref={openRef} onClick={handleClick} className="tooltip-btn">
        <i className={`${!isClose && 'open'}`}>
          <BiInfoCircle />
        </i>
      </div>
      <ToolTipPortal
        desc={desc}
        x={x}
        y={y}
        isClose={isClose}
        menuRef={menuRef}
      />
    </div>
  );
};

export default ToolTip;
