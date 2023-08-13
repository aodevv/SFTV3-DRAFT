import React from "react";

import "./Dropzone.scss";

const DropedPPEImg = ({ files }) => {
  return (
    <>
      {files[0] && (
        <img
          className="droped-img"
          src={URL.createObjectURL(files[0])}
          alt="preview"
          onLoad={() => URL.revokeObjectURL(files[0].preview)}
        />
      )}
    </>
  );
};

export default DropedPPEImg;
