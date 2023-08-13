import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiFontSize } from 'react-icons/bi';
import { CiDark } from 'react-icons/ci';
import { FiChevronLeft } from 'react-icons/fi';

import './Header.scss';

import Burger from '../../common/MIX/Burger';
import LanguageSelect from '../../common/LanguageSelect/LanguageSelect';
import UserDD from '../../common/UserDD/UserDD';
// import NotificationsDD from '../../components/NotificationsDD/NotificationsDD';

const Header = ({ full, toggleSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [withBack, setWithBack] = useState(false);

  const mapTitle = () => {
    if (pathname.includes('myprofile')) return 'Profile settings';
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/ptw')) return 'PTW Management';
    if (pathname.startsWith('/users')) return 'Users Settings';
    if (pathname.startsWith('/clients')) return 'Clients Settings';
    if (pathname.startsWith('/roles-permissions')) return 'Roles & Permissions';
    if (pathname.startsWith('/billings-subscriptions')) return 'Billings & Subscirptions';
  };

  useEffect(() => {
    if (pathname.endsWith('/sites')) setWithBack(true);
    else setWithBack(false);
  }, [pathname]);

  return (
    <div className="header">
      <div className="header__left">
        {!full ? <Burger toggle={toggleSidebar} /> : null}
        {withBack && (
          <button className="header__back-btn" onClick={() => navigate(-1)}>
            <i>
              <FiChevronLeft />
            </i>
            Back
          </button>
        )}

        <h3>{mapTitle()}</h3>
      </div>
      <div className="header__right">
        <div className="header__right-tools">
          <ul>
            <li>
              <BiFontSize />
            </li>
            <li>
              <CiDark />
            </li>
            {/* <li>
              <NotificationsDD active={true} count={2} />
            </li> */}
            <li>
              <LanguageSelect />
            </li>
          </ul>
        </div>
        <div className="header__right-user">
          {/* User DropDown component */}
          <UserDD />
        </div>
      </div>
    </div>
  );
};

export default Header;
