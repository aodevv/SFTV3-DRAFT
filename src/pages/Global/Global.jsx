import { useSelector, useDispatch } from 'react-redux';

import Header from '@layout/Header/Header';
import Sidebar from '@layout/Sidebar/Sidebar';
import Body from '@layout/Body/Body';
import { toggleSideBar } from '../../redux/layoutSlice/layoutSlice';
import './Global.scss';
import { ToastProvider } from '@common/Contexts/ToastContext';

const Global = () => {
  // const [sideBar, setSideBar] = useState(
  //   window.innerWidth > 1366 ? true : false
  // );

  const fullScreen = useSelector((state) => state.layout.fullScreen);
  const sideBar = useSelector((state) => state.layout.sideBar);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(toggleSideBar(!sideBar));
  };
  return (
    <ToastProvider>
      <div className="global">
        {!fullScreen && (
          <Sidebar full={sideBar} toggleSidebar={toggleSidebar} />
        )}

        <div className="right">
          {!fullScreen && (
            <Header full={sideBar} toggleSidebar={toggleSidebar} />
          )}

          <Body fullScreen={fullScreen} sidebar={sideBar} />
        </div>
      </div>
    </ToastProvider>
  );
};

export default Global;
