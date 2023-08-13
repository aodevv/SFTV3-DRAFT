import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { BsGearFill } from 'react-icons/bs';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { MdOutlinePrivacyTip } from 'react-icons/md';

import Dropdown from '../Dropdown/Dropdown';
import { logout } from '../../redux/authSlice/authSlice';
import { useCloseOutside } from '../Hooks/useCloseOutside';
import { resetClient } from '../../redux/clientSlice/clientSlice';

import './UserDD.scss';
import { fetchProfile } from '../../redux/profileSlice/profileSlice';

const UserDD = () => {
  const [isClose, setIsClose] = useState(true);
  const [missingImage, setMissingImage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileSlice = useSelector((state) => state.profile);
  const infos = useSelector((state) => state.profile.infos);

  const handleNavigation = (route) => {
    navigate(route);
    setIsClose(true);
  };

  const handleImageError = () => {
    setMissingImage(true);
  };

  const handleLogout = () => {
    dispatch(resetClient());
    dispatch(logout());
  };

  const [openRef, menuRef] = useCloseOutside(isClose, setIsClose);

  useEffect(() => {
    if (!profileSlice.fetched) {
      dispatch(fetchProfile());
    }
  }, [profileSlice.fetched]);

  return (
    <div className="user-dd">
      {true && (
        <>
          <div
            ref={openRef}
            onClick={() => setIsClose(!isClose)}
            className="user-dd__menu"
          >
            {!missingImage && infos?.profile_photo && (
              <img
                src={infos?.profile_photo}
                alt="user"
                className="u-mr-xs"
                onError={handleImageError}
              />
            )}

            <div>
              <h3>
                {infos?.first_name} {infos?.last_name}
              </h3>
              <h4>{infos?.role?.name}</h4>
            </div>
            <i>
              <BiChevronDown />
            </i>
          </div>

          <Dropdown
            right="0px"
            isClose={isClose}
            menuRef={menuRef}
            className=""
          >
            <li className="user__description">
              <p>
                {infos?.first_name} {infos?.last_name}
              </p>
              <p>{infos?.email}</p>
            </li>
            <div className="divider" />

            <li
              className="user__option"
              onClick={() => handleNavigation('/profile')}
            >
              <BsGearFill />
              <p>Profile settings</p>
            </li>
            <li
              onClick={() => handleNavigation('/policies')}
              className="user__option"
            >
              <MdOutlinePrivacyTip />
              <p>Policies management</p>
            </li>

            <div className="divider" />
            <li className="user__option" onClick={handleLogout}>
              <RiLogoutBoxRFill />
              <p>Log out</p>
            </li>
          </Dropdown>
        </>
      )}
    </div>
  );
};

export default UserDD;
