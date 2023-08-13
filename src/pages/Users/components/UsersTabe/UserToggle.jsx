import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';

import { toggleUserStatus } from '../../../../redux/userSlice/userSlice';
import Toggle from '@core/Toggle/Toggle';

import './UsersTable.scss';

const UserToggle = ({ status, row, setToast }) => {
  const [toggle, setToggle] = useState(status);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [toggleSpin, setToggleSpin] = useState(user.toggeling);
  const [toggeled, setToggeled] = useState(false);

  const handleToggle = () => {
    // setToggle(!toggle);

    setToggeled(true);
    dispatch(
      toggleUserStatus({
        status: status ? 0 : 1,
        id: row.original.id,
      })
    );
  };

  useEffect(() => {
    if (toggeled) setToggleSpin(user.toggeling);
  }, [user.toggeling, toggeled]);

  useEffect(() => {
    if (!user.toggeling) setToggeled(false);
  }, [user.toggeling]);

  useEffect(() => {
    setToggle(status);
  }, [status]);

  return (
    <div className="users-table__toggle">
      <span className="users-table__toggle-spinner">
        {toggleSpin && <ImSpinner2 />}
      </span>
      <Toggle isActive={toggle} handleClick={handleToggle} />
    </div>
  );
};

export default UserToggle;
