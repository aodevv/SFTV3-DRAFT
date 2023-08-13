import { useEffect, useState, useRef } from 'react';

import ActionsBtn from '@core/ActionsBtn/ActionBtn';
import ActionsPortal from './ActionsPortal';
import { useCloseOutside } from '@common/Hooks/useCloseOutside';

import './Actions.scss';
const UserTableActions = ({
  setAllowScroll,
  setUserToDelete,
  setDeleteModal,
  row,
  setUserToEdit,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [reversed, setReversed] = useState(false);
  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  let btnRef = useRef();

  const windowHeight = useRef(window.innerHeight);
  const sH = windowHeight.current;

  const handleClick = () => {
    const btnCoords = btnRef.current.getBoundingClientRect();
    const { x, y } = btnCoords;
    setX(x);
    setY(y);

    if (y > (sH * 3) / 4 + 50) {
      setReversed(true);
    }

    setUserToDelete(row);
    setIsClose(!isClose);
  };

  const openDeleteModal = () => {
    console.log(row);
    setDeleteModal(true);
    setIsClose(true);
    setUserToDelete(row);
  };

  const handleEdit = () => {
    setUserToEdit(row);
    setIsClose(!isClose);
  };

  useEffect(() => {
    if (isClose) {
      setAllowScroll(false);
    } else {
      setAllowScroll(true);
    }
  }, [isClose]);

  return (
    <ActionsBtn
      btnRef={btnRef}
      wideParent={true}
      openRef={openRef}
      onClick={handleClick}
    >
      <ActionsPortal
        x={x}
        y={y}
        isClose={isClose}
        reversed={reversed}
        menuRef={menuRef}
        row={row}
        openDeleteModal={openDeleteModal}
        handleEdit={handleEdit}
      />
    </ActionsBtn>
  );
};

export default UserTableActions;
