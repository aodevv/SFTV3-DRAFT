import { IoClose } from 'react-icons/io5';
import { MdModeEdit, MdRemoveRedEye } from 'react-icons/md';

import ReactDom from 'react-dom';

import Dropdown from '@common/Dropdown/Dropdown';
import './Actions.scss';
import { useNavigate } from 'react-router-dom';

const ActionsPortal = ({
  isClose,
  reversed,
  menuRef,
  x,
  y,
  row,
  openDeleteModal,
  handleEdit,
}) => {
  const navigate = useNavigate();
  const { id } = row;

  const handleProfile = () => {
    navigate(`/users/${id}`);
  };
  return ReactDom.createPortal(
    <>
      <Dropdown
        isClose={isClose}
        // position={{ right: "42px", top: "18px" }}
        // right={x}
        left={x}
        portal
        // top={!reversed ? 120 : -400}
        top={!reversed ? y : y - 158}
        menuRef={menuRef}
        className="actions action-dropdown bordered"
      >
        <li className="title">
          <p>Actions</p>
        </li>

        <li className="delete" onClick={openDeleteModal}>
          <i>
            <IoClose />
          </i>
          <p>Delete</p>
        </li>
        <li className="edit" onClick={handleEdit}>
          <i>
            <MdModeEdit />
          </i>
          <p>Edit</p>
        </li>
        <li className="actions-profile" onClick={handleProfile}>
          <i>
            <MdRemoveRedEye />
          </i>
          <p>Profile</p>
        </li>
      </Dropdown>
    </>,
    document.getElementById('actions')
  );
};

export default ActionsPortal;
