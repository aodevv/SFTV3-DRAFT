import { useState } from 'react';

const useToaster = () => {
  const [toast, setToast] = useState({ show: false, type: '', text: '' });

  const showSuccessToast = (text, rest = {}) => {
    setToast({ show: true, type: 'success', text, ...rest });
  };

  const showWarningToast = (text, rest = {}) => {
    setToast({ show: true, type: 'warning', text, ...rest });
  };

  const showErrorToast = (text, rest = {}) => {
    setToast({ show: true, type: 'error', text, ...rest });
  };

  const closeToast = () => {
    setToast({
      text: '',
      type: '',
      show: false,
    });
  };

  return {
    showSuccessToast,
    showWarningToast,
    showErrorToast,
    toast,
    closeToast,
  };
};

export default useToaster;
