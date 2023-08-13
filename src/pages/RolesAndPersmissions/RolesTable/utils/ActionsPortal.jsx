import { IoClose } from 'react-icons/io5';
import {
  MdCheckBoxOutlineBlank,
  MdContentCopy,
  MdModeEdit,
} from 'react-icons/md';
import ReactDom from 'react-dom';

import Dropdown from '@common/Dropdown/Dropdown';
// import './Actions.scss';

const ActionsPortal = ({
  isClose,
  menuRef,
  x,
  y,
  handleDelete,
  duplicateColumn,
  handleEdit,
  handleRoleCheck,
  deletable,
}) => {
  return ReactDom.createPortal(
    <>
      <Dropdown
        isClose={isClose}
        left={x - 50}
        top={y}
        // right="0px"
        portal
        menuRef={menuRef}
        className="dropdown dropdown-portal"
      >
        <li className="title">
          <p>Actions</p>
        </li>
        {deletable && (
          <li className="select-icon action-item" onClick={handleRoleCheck}>
            <i>
              <MdCheckBoxOutlineBlank />
            </i>
            <p>Select</p>
          </li>
        )}

        <li className="edit" onClick={handleEdit}>
          <i>
            <MdModeEdit />
          </i>
          <p>Edit</p>
        </li>

        <li className="duplicate-icon action-item" onClick={duplicateColumn}>
          <i>
            <MdContentCopy />
          </i>
          <p>Duplicate</p>
        </li>

        {deletable && (
          <li className="delete" onClick={handleDelete}>
            <i>
              <IoClose />
            </i>
            <p>Delete</p>
          </li>
        )}
      </Dropdown>
    </>,
    document.getElementById('actions')
  );
};

export default ActionsPortal;
