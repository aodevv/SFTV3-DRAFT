import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';
import { IoCloseSharp, IoCloseCircle, IoWarning } from 'react-icons/io5';

import './Toast.scss';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
};

const Toast = ({ text, type, closeToast, link }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [progress, setProgress] = useState(!link ? 100 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    closeToast();
  };

  const handleHover = () => {
    if (!link) {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      setIsPaused(true);
    }
  };

  const handleLeave = () => {
    if (!link) {
      setTimeoutId(
        setTimeout(() => {
          handleClose();
        }, progress * 80)
      );
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (!link) {
      setTimeoutId(
        setTimeout(() => {
          closeToast();
        }, 8000)
      );
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // let timer;
    if (!link && isPaused) {
      clearInterval(intervalId);
    }
    if (!link && !isPaused) {
      setIntervalId(
        setInterval(() => {
          setProgress((prevProgress) => prevProgress - 0.1);
        }, 8)
      );
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused, link]);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ease: 'easeOut', duration: 0.2, delay: 0.2 }}
      className={`toast ${type}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div style={{ width: `${progress}%` }} className="toast__loader"></div>
      <div className="toast__text">
        <i className="toast__icon">
          {type === 'success' && <HiCheckCircle />}
          {type === 'error' && <IoCloseCircle />}
          {type === 'warning' && <IoWarning />}
        </i>
        <p>
          {text}
          {link && (
            <span onClick={() => navigate(link)} className="toast__link">
              follow this link!
            </span>
          )}
        </p>
      </div>
      <i className="toast__close" onClick={handleClose}>
        <IoCloseSharp />
      </i>
    </motion.div>
  );
};

export default Toast;
