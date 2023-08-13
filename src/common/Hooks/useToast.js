import { useEffect } from 'react';

export const useSuccessToast = (
  setToast,
  message,
  editing,
  done,
  setDone,
  error
) => {
  useEffect(() => {
    if (!editing && done && !error) {
      {
        setToast({
          show: true,
          text: message,
          type: 'success',
        });
        setDone(false);
      }
    }
  }, [editing, done, error]);
};
