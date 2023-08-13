import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

import ToastContext from '@common/Contexts/ToastContext';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addRole } from '../../../../redux/rolesSlice/rolesSlice';
import { ImSpinner2 } from 'react-icons/im';

const ColumnHeaderInput = ({ columnId, removeColumn, oldName, index }) => {
  const { showSuccessToast } = useContext(ToastContext);
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

  const posting = useSelector((state) => state.role.posting);
  const error = useSelector((state) => state.role.error);

  const handleColumnDelete = () => {
    removeColumn(columnId);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && name !== '') {
      if (oldName === 'pending') {
        setDone(false);

        dispatch(addRole({ name, index }));
        setDone(true);
      }
    }
  };

  useEffect(() => {
    if (done && !posting && !error) {
      showSuccessToast('New role added successfully.');
    }
  }, [done, error, posting]);

  return (
    <div className="column-header-input">
      <div className="column-header-input-container">
        <input
          type="text"
          placeholder="Type role ..."
          value={name}
          className="header-input"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {posting && (
          <i className="header-input__spinner">
            <ImSpinner2 />
          </i>
        )}
      </div>

      <span onClick={handleColumnDelete}>
        <RiDeleteBin6Line />
      </span>
    </div>
  );
};

export default ColumnHeaderInput;
