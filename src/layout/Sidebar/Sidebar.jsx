import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';
import logo_wide from '../../assets/logo-wide.png';
import Burger from '../../common/MIX/Burger';
import { navItemsBottom, navItemsTop } from './nav-settings';
import './Sidebar.scss';
import { useState } from 'react';

const Sidebar = ({ full, toggleSidebar }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className={`sidebar ${full ? 'sidebar-full' : ''}`}>
      <div className="sidebar__logo">
        {full ? (
          <>
            <div className="logo-wide">
              <img src={logo_wide} alt="logo" />
              <Burger toggle={toggleSidebar} />
            </div>
          </>
        ) : (
          <>
            <img src={logo} alt="logo" />
          </>
        )}
      </div>
      <div className={`sidebar__header custom-scrollbar`}>
        <div className="sidebar__header-top">
          <ul className={`sidebar__header-settings ${full ? 'full' : ''}`}>
            {navItemsTop.map((item) => {
              const { title, route, icon } = item;
              const startOfPathname = pathname.split('/').slice(0, 2).join('/');
              return (
                <li
                  key={title}
                  className={`${startOfPathname === route && 'active'}`}
                  onClick={() => navigate(route)
                           
                  }
                >
                  {icon}
                  <p>{title}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sidebar__header-bottom">
          {full && <p className="sidebar__divider">MANAGE</p>}
          <ul className={`sidebar__header-settings ${full ? 'full' : ''}`}>
            {navItemsBottom.map((item) => {
              const { title, route, icon, iconOpened, iconClosed} = item;
              const startOfPathname = pathname.split('/').slice(0, 2).join('/');
              return (
                <li
                  key={title}
                  className={`${startOfPathname === route && 'active'}`}
                  onClick={() => navigate(route)}
                >
                  {icon}
                  <p>{title}</p>
                  <i onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? iconOpened : iconClosed}
                  </i>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {full && (
        <div className="sidebar__footer">
          <h2>© Safety Tracker 2023</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
