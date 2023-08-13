import React, { useState, useCallback, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';
import { GiFireZone } from 'react-icons/gi';
import { FaCloudUploadAlt } from 'react-icons/fa';

import DropedImg from '../utils/DropedImg';

import { humanFileSize } from '../utils/funcs';

import avatar from '@assets/avatar.png';
import editImage from '@assets/svg/editImage.svg';

import './AvatarDropzone.scss';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AvatarDropzone = ({
  files,
  setFiles,
  img,
  profile,
  company,
  cover,
  contain,
  className,
  disabled,
}) => {
  const [error, setError] = useState('');
  const acceptedFileTypes = ['image/png', 'image/jpeg'];
  const [imgError, setImgError] = useState(false);

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
    disabled,
  });

  const onRemoveFile = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  return (
    <div className={className} style={profile && { width: '100%' }}>
      <div
        {...getRootProps()}
        className={`avatar-dropzone ${
          isDragActive && 'avatar-dropzone__is-active'
        }  ${isDragReject && 'avatar-dropzone__error'} ${
          error && 'avatar-dropzone__error'
        }`}
      >
        {!img && !disabled && (
          <div className="avatar-dropzone__edit-icon">
            <img src={editImage} alt="" />
          </div>
        )}
        <input {...getInputProps()} />
        {!isDragActive ? (
          <div
            className={`avatar-dropzone__img ${cover && 'cover'} ${
              contain && 'contain'
            }`}
          >
            {files?.length > 0 && typeof files !== 'string' ? (
              <DropedImg files={files} />
            ) : (
              <>
                {img && !imgError ? (
                  <img
                    src={img}
                    alt="worker-img"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <img src={avatar} alt="avatar" />
                )}
                <div className="avatar-overlay">
                  <FaCloudUploadAlt />
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <i className="avatar-dropzone__icon">
              <GiFireZone />
            </i>
          </div>
        )}
      </div>
      {error && <p className="avatar-dropzone__error-msg">{error}</p>}

      <div className={`avatar-dropzone__infos ${profile && 'full'}`}>
        {files?.length > 0 && typeof files !== 'string' ? (
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
            </p>
            <button onClick={onRemoveFile}>remove</button> */}

            <div>
              <span onClick={onRemoveFile} className="delete-image">
                <i>
                  <RiDeleteBin6Line />
                </i>
              </span>
              {profile && <h1 style={{ margin: 'auto' }}>My Profile</h1>}
            </div>
          </>
        ) : img ? (
          <>
            {profile ? (
              <h1 style={{ margin: 'auto' }}>
                {company ? 'Company Profile' : 'My Profile'}
              </h1>
            ) : null}
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <>
              {profile ? (
                <h1>{company ? 'Company Profile' : 'My Profile'}</h1>
              ) : null}
            </>
            {!disabled && <p>Don't worry, you can always change it later!</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarDropzone;
