import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { updatePermissionStatus } from '../../../../redux/rolesSlice/rolesSlice';

const Checkbox = ({ value, permissionId, roleId }) => {
  const [checked, setChecked] = useState(value);
  const [toggeled, setToggeled] = useState(false);
  const dispatch = useDispatch();

  const toggeling = useSelector((state) => state.role.toggeling);
  const [togglePending, setTogglePending] = useState(toggeling);

  const handleCheck = () => {
    setToggeled(true);
    setChecked(!checked);
    console.log(permissionId, roleId);
    dispatch(updatePermissionStatus({ status: checked, roleId, permissionId }));
  };

  useEffect(() => {
    if (toggeled) setTogglePending(toggeling);
  }, [toggeling, toggeled]);

  useEffect(() => {
    if (!toggeling) setToggeled(false);
  }, [toggeling]);

  return (
    <div className="cell-checkbox">
      {togglePending && (
        <i className="cell-checkbox__loader">
          <ImSpinner2 />
        </i>
      )}

      <input
        id={`${permissionId},${roleId}`}
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
      />
      {checked && (
        <label htmlFor={`${permissionId},${roleId}`}>
          <FaCheck />
        </label>
      )}
    </div>
  );
};

export default Checkbox;
