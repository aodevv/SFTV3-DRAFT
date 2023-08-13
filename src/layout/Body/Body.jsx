import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './Body.scss';
import ToastContext from '@common/Contexts/ToastContext';
import Toast from '../../common/@core/Toast/Toast';

const Body = ({ sidebar, fullScreen }) => {
  const { toast, closeToast } = useContext(ToastContext);
  return (
    <div
      className={`body ${sidebar && 'full-sidebar'} ${
        fullScreen && 'full-screen'
      }`}
    >
      <AnimatePresence initial={false} mode="wait">
        {toast.show && (
          <Toast
            text={toast.text}
            type={toast.type}
            closeToast={closeToast}
            link={toast.link}
          />
        )}
      </AnimatePresence>
      <Outlet context={{ sidebar }} />
    </div>
  );
};

export default Body;
