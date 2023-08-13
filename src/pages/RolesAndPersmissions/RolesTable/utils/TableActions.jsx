import { useRef, useState } from 'react';

import { useCloseOutside } from '@common/Hooks/useCloseOutside';
import ActionsBtn from '@core/ActionsBtn/ActionBtn';
import ActionsPortal from './ActionsPortal';

const TableActions = ({
  setEdit,
  setRoleToDelete,
  setDeleteModal,
  duplicateColumn,
  columnToDelete,
  handleRoleCheck,
  deletable,
}) => {
  const [isClose, setIsClose] = useState(true);
  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');

  let btnRef = useRef();

  const handleClick = () => {
    const btnCoords = btnRef.current.getBoundingClientRect();
    const { x, y } = btnCoords;
    setX(x);
    setY(y);

    setRoleToDelete(columnToDelete);

    setIsClose(!isClose);
  };

  const handleEdit = () => {
    setEdit(true);
    setIsClose(true);
  };

  const handleDelete = () => {
    setDeleteModal(true);
    setIsClose(true);
  };

  const handleRoleCheckAction = () => {
    handleRoleCheck();
    setIsClose(true);
  };

  return (
    <div>
      <ActionsBtn
        btnRef={btnRef}
        openRef={openRef}
        onClick={handleClick}
        className=""
      >
        <ActionsPortal
          x={x}
          y={y}
          isClose={isClose}
          menuRef={menuRef}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          duplicateColumn={duplicateColumn}
          handleRoleCheck={handleRoleCheckAction}
          deletable={deletable}
        />
      </ActionsBtn>
    </div>
  );
};

export default TableActions;
