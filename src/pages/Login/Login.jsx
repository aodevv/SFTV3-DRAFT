import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoginForm from './LoginForm/LoginForm';
import ResetPassword from './LoginForm/ResetPassword';
import NewPassword from './LoginForm/NewPassword';
import Toast from '../../common/@core/Toast/Toast';

import './Login.scss';

const Login = () => {
  const { pathname } = useLocation();
  const [toast, setToast] = useState({
    text: '',
    type: '',
    show: false,
  });

  const closeToast = () => {
    setToast({
      text: '',
      type: '',
      show: false,
    });
  };

  return (
    <div className="loginpage">
      <AnimatePresence initial={false} mode="wait">
        {toast.show && (
          <Toast text={toast.text} type={toast.type} closeToast={closeToast} />
        )}
      </AnimatePresence>
      <div
        className="loginpage__img"
        style={{
          backgroundImage: 'url(/login/company.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom left',
        }}
      />
      <div className="loginpage__form">
        {pathname === '/login' && <LoginForm setToast={setToast} />}
        {pathname === '/reset-password' && <ResetPassword />}
        {pathname.includes('/new-password') && <NewPassword />}
      </div>
    </div>
  );
};

export default Login;
