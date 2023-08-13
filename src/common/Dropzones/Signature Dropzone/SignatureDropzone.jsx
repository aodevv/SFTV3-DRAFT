import React, { useMemo, useState, useEffect, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GiFireZone } from "react-icons/gi";
import { FaSignature } from "react-icons/fa";

import DropedImg from "../utils/DropedImg";
// import DropedSignature from "../utils/DropedSignature";

import avatar from "../../../assets/avatar.png";

import { humanFileSize } from "../utils/funcs";
import "./SignatureDropzone.scss";

const SignatureDropzone = ({ files, setFiles, img }) => {
  const [error, setError] = useState("");
  const acceptedFileTypes = ["image/png", "image/jpeg"];
  const [oldImg, setOldImg] = useState(img);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (!acceptedFileTypes.includes(file.type)) {
          setError(`File type ${file.type} is not allowed.`);
          files.forEach((file) => URL.revokeObjectURL(file.preview));
          setFiles([]);
          return;
        } else {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            )
          );
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
    open,
  } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop,
  });

  const onRemoveFile = () => {
    URL.revokeObjectURL(files.preview);
    setFiles([]);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`square-dropzone ${
          isDragActive && "square-dropzone__is-active"
        } ${files.length > 0 && !error && "square-dropzone__accepted"} ${
          isDragReject && "square-dropzone__error"
        } ${error && "square-dropzone__error"}`}
      >
        <input {...getInputProps()} />
        {!isDragActive ? (
          <div className="square-dropzone__container">
            {files.length > 0 && typeof files !== "string" ? (
              <DropedImg files={files} />
            ) : (
              <>
                {img ? (
                  <img src={img} alt="square-img" />
                ) : (
                  <i className="square-dropzone__sig">
                    <FaSignature />
                  </i>
                )}
                {/* <div className="square-overlay">
                  <FaCloudUploadAlt />
                </div> */}
              </>
            )}
          </div>
        ) : (
          <div>
            <i className="square-dropzone__icon">
              <GiFireZone />
            </i>
          </div>
        )}
      </div>
      {error && <p className="square-dropzone__error-msg">{error}</p>}
      <div className="square-dropzone__infos">
        {files.length > 0 && typeof files !== "string" && (
          <>
            {/* <p>
              <span className="file-name">
                {files[0].name.length > 8
                  ? files[0].name.substring(0, 8) +
                    "...." +
                    files[0].name.split(".")[1]
                  : files[0].name}{" "}
              </span>
              <span className="file-size">{humanFileSize(files[0].size)}</span>
            </p> */}
            <button className="remove-btn" type="button" onClick={onRemoveFile}>
              remove
            </button>
          </>
        )}
      </div>
      <button onClick={open} type="button" className="square-dropzone__upload">
        UPLOAD SIGNATURE
      </button>
    </div>
  );
};

export default SignatureDropzone;
