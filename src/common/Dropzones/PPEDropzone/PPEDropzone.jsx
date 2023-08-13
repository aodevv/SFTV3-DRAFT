import React, { useMemo, useState, useEffect, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

import { GiFireZone } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";

import DropedPPEImg from "../utils/DropedPPEImg";

import "./PPEDropzone.scss";

const PPEDropzone = ({ files, setFiles, existingImg}) => {
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

  const onRemoveFile = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setOldImg(!!existingImg.length);
    if (existingImg) {
      console.log(existingImg);
      setFiles(existingImg);
    } else setFiles([]);
  };

  useEffect(() => {
    setOldImg(!!existingImg.length);
  }, [existingImg]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`ppe-dropzone ${
          isDragActive && "ppe-dropzone__is-active"
        } ${files.length > 0 && !error && "ppe-dropzone__accepted"} ${
          isDragReject && "ppe-dropzone__error"
        } ${error && "ppe-dropzone__error"}`}
      >
        <input {...getInputProps()} />
        {!isDragActive ? (
          oldImg ? (
            <img src={existingImg} className="droped-img" alt="img_preview" />
          ) : files.length > 0 && typeof files !== "string" ? (
            <DropedPPEImg files={files} />
          ) : (
            <div>
              <i className="ppe-dropzone__icon">
                <FaCloudUploadAlt />
              </i>
              <p className="ppe-dropzone__text">
                Drag and drop your image here or <span>browse files</span>
              </p>
            </div>
          )
        ) : (
          <div>
            <i className="ppe-dropzone__icon">
              <GiFireZone />
            </i>
          </div>
        )}
      </div>
      {error && <p className="ppe-dropzone__error-msg">{error}</p>}
    </div>
  );
};

export default PPEDropzone;
