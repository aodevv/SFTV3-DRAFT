import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ActionsBtn from '../../../@core/ActionsBtn/ActionBtn';
import ActionsPortal from './ActionsPortal';
import { useCloseOutside } from '../../../Hooks/useCloseOutside';

import './Actions.scss';
const WorkerActions = ({
  workerId,
  row,
  setClientToDelete,
  setDeleteModal,
  setModal,
  setAllowScroll,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [reversed, setReversed] = useState(false);
  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  const navigate = useNavigate();
  let btnRef = useRef();

  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const sW = windowWidth.current;
  const sH = windowHeight.current;

  const handleClick = () => {
    const btnCoords = btnRef.current.getBoundingClientRect();
    const { x, y } = btnCoords;
    setX(x);
    setY(y);

    if (y > (sH * 3) / 4 + 50) {
      setReversed(true);
    }

    console.log(y, sW);
    setClientToDelete(row);
    setIsClose(!isClose);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
    setClientToDelete(row);
    setIsClose(true);
  };

  const handleEdit = () => {
    setModal({
      show: true,
      edit: true,
      data: row,
    });
    setIsClose(!isClose);
  };

  const navigateToPreference = () => {
    navigate(`/clients/${workerId}/preferences`);
  };

  // const openProfilePage = () => {
  //   console.log(row);
  //   navigate("/workers/activeWorker");
  // };

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
        openDeleteModal={openDeleteModal}
        handleEdit={handleEdit}
        preferences={navigateToPreference}
        // openProfilePage={openProfilePage}
      />
    </ActionsBtn>
  );
};

export default WorkerActions;
