import { createContext } from 'react';
import useToaster from '@common/Hooks/useToaster';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toaster = useToaster();

  return (
    <ToastContext.Provider value={toaster}>{children}</ToastContext.Provider>
  );
};

export default ToastContext;
