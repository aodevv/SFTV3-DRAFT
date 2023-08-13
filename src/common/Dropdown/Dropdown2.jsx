import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import "./Dropdown.scss";

const Dropdown2 = ({ isClose, menuRef, children, className }) => {
  return (
    <AnimatePresence>
      {!isClose && (
        <motion.div
          initial={{
            opacity: 0,
            position: "absolute",
            right: 0,
            zIndex: 30,
          }}
          animate={{
            opacity: 1,
            position: "absolute",
            right: 0,
            zIndex: 30,
          }}
          exit={{
            opacity: 0,
            position: "absolute",
            right: 0,
            zIndex: 30,
          }}
          transition={{ duration: 0.5 }}
          ref={menuRef}
        >
          <div className={`dropdown ${className}`}>
            <ul>{children}</ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown2;
