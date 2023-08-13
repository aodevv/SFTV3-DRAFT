import React from "react";
import "./DropedSignature.scss"

const DropedSignature = ({ files }) => {
  return (
    <>
      {files && (
        <img
          className="droped-signature"
          src={URL.createObjectURL(files[0])}
          alt="preview"
          onLoad={() => URL.revokeObjectURL(files[0].preview)}
        />
      )}
    </>
  );
};

export default DropedSignature;