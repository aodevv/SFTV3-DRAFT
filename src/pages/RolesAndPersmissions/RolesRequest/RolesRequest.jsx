import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';

import './RolesRequest.scss';
import avatar from '@assets/human2.png';
import TableContext from '../RolesTable/RolesTableContext';
import { RiDeleteBin6Line } from 'react-icons/ri';

const RolesRequest = ({ date, name, role, setMultiDelete }) => {
  const { allRolesUnchecked } = useContext(TableContext);
  useEffect(() => {
    if (allRolesUnchecked) {
      setMultiDelete(false);
    }
  }, [allRolesUnchecked]);

  return (
    <div className="roles-request-container">
      {!allRolesUnchecked && (
        <div
          onClick={() => setMultiDelete(true)}
          className="roles-request__delete"
        >
          <span>
            <RiDeleteBin6Line />
          </span>
        </div>
      )}
      <div className="roles-request">
        <p>The last change was made by</p>
        <div className="roles-request__requester">
          <div className="roles-request__requester-img">
            <img src={avatar} alt="requester-img" />
          </div>
          <p>{name}</p>
          <span>{`(${role})`}</span>
        </div>
        <p>on {dayjs(date).format('MMMM D, YYYY, h:mm A')}</p>
      </div>
    </div>
  );
};

export default RolesRequest;
