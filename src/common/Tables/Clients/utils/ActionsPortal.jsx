import ReactDom from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { BsFillGearFill } from 'react-icons/bs';
import { MdDownload, MdModeEdit } from 'react-icons/md';

import Dropdown from '../../../Dropdown/Dropdown';
import './Actions.scss';
import './ActionsPortal.scss';

const ActionsPortal = ({
  isClose,
  reversed,
  menuRef,
  openDeleteModal,
  handleEdit,
  openProfilePage,
  preferences,
  x,
  y,
}) => {
  return ReactDom.createPortal(
    <>
      <Dropdown
        isClose={isClose}
        // position={{ right: "42px", top: "18px" }}
        // right={x}
        left={x - 30}
        portal
        // top={!reversed ? 120 : -400}
        top={!reversed ? y : y - 199}
        menuRef={menuRef}
        className="actions action-dropdown bordered"
      >
        <li className="title">
          <p>Actions</p>
        </li>

        <li onClick={preferences} className="preference">
          <i>
            <BsFillGearFill />
          </i>
          <p>Preferences</p>
        </li>

        <li onClick={handleEdit} className="edit">
          <i>
            <MdModeEdit />
          </i>
          <p>Edit</p>
        </li>

        <li onClick={openDeleteModal} className="delete">
          <i>
            <IoClose />
          </i>
          <p>Delete</p>
        </li>
        <li onClick={openProfilePage} className="actions-download">
          <i>
            <MdDownload />
          </i>
          <p>Export</p>
        </li>
      </Dropdown>
    </>,
    document.getElementById('actions')
  );
};

export default ActionsPortal;
