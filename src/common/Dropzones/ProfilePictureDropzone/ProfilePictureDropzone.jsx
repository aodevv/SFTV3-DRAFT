import React, { useMemo, useState, useEffect, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

import { GiFireZone } from "react-icons/gi";


import DropedProfilePicture from "../utils/DropedProfilePicture"

import "./ProfilePictureDropzone.scss";

const ProfilePictureDropzone = ({ files, setFiles, existingImg, profile }) => {
  const [error, setError] = useState("");
  const acceptedFileTypes = ["image/png", "image/jpeg"];

  const [oldImg, setOldImg] = useState(!!existingImg.length);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (!acceptedFileTypes.includes(file.type)) {
          setError(`File type ${file.type} is not allowed.`);
          files.forEach((file) => URL.revokeObjectURL(file.preview));
          setFiles([]);
          return;
        } else {
          console.log(file.name.length);
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
          setOldImg(false);
          setError("");
        }
      });
    },
    [acceptedFileTypes]
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop,
  });


  useEffect(() => {
    setOldImg(!!existingImg.length);
  }, [existingImg]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive && "dropzone__is-active"} `}
      >
        <input {...getInputProps()} />
        {!isDragActive ? (
          oldImg ?            <>
          <img src={existingImg} className="dropped-img" alt="img_preview" />
          <i className="dropzone__icon">
          <FaCloudUploadAlt />
        </i>
        </>
           : files.length > 0 && typeof files !== "string" ? (
            <DropedProfilePicture files={files} />
          ) : (
            <div>
              <i className="dropzone__icon">
                <FaCloudUploadAlt />
              </i>
            </div>
          )
        ) : (
          <div>
            <i className="dropzone__icon">
              <GiFireZone />
            </i>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureDropzone;
