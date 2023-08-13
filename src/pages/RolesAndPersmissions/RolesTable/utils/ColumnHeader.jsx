import { useContext, useEffect, useState } from 'react';
import TableActions from './TableActions';
import { useDispatch, useSelector } from 'react-redux';

import ToastContext from '@common/Contexts/ToastContext';
import TableContext from '../RolesTableContext';
import './styles.scss';
import ToolTip from '../../../../common/@core/ToolTip/ToolTip';
import { editRoleName } from '../../../../redux/rolesSlice/rolesSlice';
import { ImSpinner2 } from 'react-icons/im';

const ColumnHeader = ({
  name,
  duplicateColumn,
  columnId,
  setRoleToDelete,
  setDeleteModal,
  deletable,
}) => {
  const { showSuccessToast } = useContext(ToastContext);
  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [roleChecked, setRoleChecked] = useState(false);
  const dispatch = useDispatch();

  const posting = useSelector((state) => state.role.posting);
  const error = useSelector((state) => state.role.error);

  const { setCheckedRoles, allRolesUnchecked, checkedRoles } =
    useContext(TableContext);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setDone(false);
      // updateColumnName(columnId, newName);
      dispatch(editRoleName({ id: columnId, name: newName }));
      setDone(true);
    }
    if (event.keyCode === 27) {
      setEdit(false);
      setNewName(name);
    }
  };

  const handleRoleCheck = () => {
    if (deletable) {
      setCheckedRoles((prev) => {
        const itemToChange = prev.findIndex((item) => item.id === columnId);
        const newArray = [...prev];
        newArray[itemToChange] = { id: columnId, checked: !roleChecked };
        return newArray;
      });
      setRoleChecked(!roleChecked);
    }
  };

  useEffect(() => {
    checkedRoles.forEach((el) => {
      if (el.id === columnId && el.checked) setRoleChecked(true);
    });
  }, []);

  useEffect(() => {
    if (done && !posting && !error) {
      showSuccessToast('Role name updated successfully.');
    }
  }, [done, error, posting]);

  return (
    <div className="column-header">
      {edit ? (
        <div className="header-input-container">
          <input
            type="text"
            placeholder="Type role ..."
            value={newName}
            className="header-input"
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {posting && (
            <i className="header-input__spinner">
              <ImSpinner2 />
            </i>
          )}
        </div>
      ) : (
        <div className="column-header__left">
          {!allRolesUnchecked &&
            (deletable ? (
              <input
                type="checkbox"
                checked={roleChecked}
                onChange={handleRoleCheck}
              />
            ) : (
              <ToolTip desc="This role can't be deleted" />
            ))}

          <p>{name}</p>
        </div>
      )}

      <TableActions
        setEdit={setEdit}
        setRoleToDelete={setRoleToDelete}
        setDeleteModal={setDeleteModal}
        columnToDelete={{ id: columnId, name }}
        duplicateColumn={duplicateColumn}
        handleRoleCheck={handleRoleCheck}
        deletable={deletable}
      />
    </div>
  );
};

export default ColumnHeader;
