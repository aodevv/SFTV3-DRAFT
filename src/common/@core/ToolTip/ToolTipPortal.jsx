import ReactDom from 'react-dom';

import Dropdown from '@common/Dropdown/Dropdown';

const ToolTipPortal = ({ isClose, menuRef, desc, x, y }) => {
  return ReactDom.createPortal(
    <>
      <Dropdown
        isClose={isClose}
        menuRef={menuRef}
        className="tl"
        left={x + 20 - 91}
        top={y - 6}
        portal
        tooltip
      >
        <div className="tooltip__container">
          <span className="tooltip__triangle" />
          <p>{desc}</p>
        </div>
      </Dropdown>
    </>,
    document.getElementById('tooltip')
  );
};

export default ToolTipPortal;
