import React from "react";
import "./DropedProfilePicture.scss"

const DropedProfilePicture = ({ files }) => {
  console.log('DropedProfilePicture')
  console.log(files[0])
  return (
    <>
      {files[0] && (
        <img
          className="droped-pfp"
          src={URL.createObjectURL(files[0])}
          alt="profile-picture"
          onLoad={() => URL.revokeObjectURL(files[0].preview)}
        />
      )}

    </>
  );
};

export default DropedProfilePicture;