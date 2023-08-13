import React from "react";

import { motion } from "framer-motion";
import "./Modal.scss";

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
};

const Modal = ({ children, rounded, centered, onTop }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className="modal"
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <div className="overlay"></div>
      <div
        className={`${rounded && "rounded"} ${onTop && "ontop"} ${
          centered && "centered"
        } modal__content`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
