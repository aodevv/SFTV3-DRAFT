import React, { useMemo, useState, useEffect, useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { GiFireZone } from 'react-icons/gi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import DropedImg from '../utils/DropedImg';

import './CompanyDropzone.scss';

const CompanyDropzone = ({ files, setFiles, existingImg, profile }) => {
  const [error, setError] = useState('');
  const acceptedFileTypes = ['image/png', 'image/jpeg'];

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
          setError('');
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
      'image/*': ['.jpeg', '.jpg', '.png'],
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
        className={`company-dropzone ${
          isDragActive && 'company-dropzone__is-active'
        } ${files?.length > 0 && !error && 'company-dropzone__accepted'} ${
          isDragReject && 'company-dropzone__error'
        } ${error && 'company-dropzone__error'}`}
      >
        <input {...getInputProps()} />
        {!isDragActive ? (
          oldImg ? (
            <img src={existingImg} className="droped-img" alt="img_preview" />
          ) : files?.length > 0 && typeof files !== 'string' ? (
            <DropedImg files={files} />
          ) : (
            <div>
              <i className="company-dropzone__icon">
                <FaCloudUploadAlt />
              </i>
              <p className="company-dropzone__text">
                Drag and drop your image here or <span>browse files</span>
              </p>
            </div>
          )
        ) : (
          <div>
            <i className="company-dropzone__icon">
              <GiFireZone />
            </i>
          </div>
        )}
      </div>
      {error && <p className="company-dropzone__error-msg">{error}</p>}

      {oldImg
        ? null
        : files?.length > 0 &&
          typeof files !== 'string' && (
            <div className="company-dropzone__file-infos">
              {/* <p>
                <span className="file-name">
                  {files[0].name.length > 15
                    ? files[0].name.substring(0, 10) +
                      "...." +
                      files[0].name.split(".")[1]
                    : files[0].name}{" "}
                </span>
                <span className="file-size">
                  {Math.round(files[0].size / 100) / 10} KB
                </span>
              </p>
              <button onClick={onRemoveFile}>remove</button> */}
              <span onClick={onRemoveFile} className="delete-image">
                <i>
                  <RiDeleteBin6Line />
                </i>
              </span>
            </div>
          )}
      {profile && <h1 className="company-profile">Company Profile</h1>}
    </div>
  );
};

export default CompanyDropzone;
