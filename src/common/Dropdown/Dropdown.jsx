import { AnimatePresence, motion } from 'framer-motion';

import './Dropdown.scss';

const Dropdown = ({
  isClose,
  menuRef,
  children,
  className,
  position,
  right,
  top,
  left,
  portal,
  tooltip,
}) => {
  return (
    <AnimatePresence>
      {!isClose && (
        <motion.div
          initial={{
            opacity: 0,
            position: 'absolute',
            right: !portal && right ? right : null,
            left: portal ? left - 20 : tooltip ? left : null,
            top: !portal ? (top ? `${top - 20}%` : '80%') : top + 26,
            zIndex: 30,
          }}
          animate={{
            opacity: 1,
            position: 'absolute',
            right: !portal && right ? right : null,
            left: portal && left - 20,
            top: !portal ? (top ? `${top}%` : '100%') : top + 34,
            zIndex: 30,
          }}
          exit={{
            opacity: 0,
            position: 'absolute',
            right: !portal && right ? right : null,
            left: portal && left - 20,
            top: !portal ? (top ? `${top - 20}%` : '80%') : top + 26,
            zIndex: 30,
          }}
          transition={{ duration: 0.2 }}
          ref={menuRef}
        >
          <div style={{ ...position }} className={`dropdown ${className}`}>
            <ul>{children}</ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
