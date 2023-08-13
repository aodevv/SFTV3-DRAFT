import classNames from 'classnames';
import { useState, useCallback, useEffect } from 'react';
import { GiFireZone } from 'react-icons/gi';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

import './PtwDropzone.scss';
import DroppedImages from './DroppedImages';

const PtwDropzone = ({ files, setFiles }) => {
  // const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (files.length >= 2) {
        console.log('Max reached');
      } else {
        const filesToUpload = [...files];
        acceptedFiles.forEach((file) => {
          if (!acceptedFileTypes.includes(file.type)) {
            setError(`File type ${file.type} is not allowed.`);
            //   files.forEach((file) => URL.revokeObjectURL(file.preview));
            return;
          } else {
            const existingFile = files.find((item) => item.name === file.name);

            if (existingFile) {
              console.log('File already exists');
              filesToUpload.push(file);
            } else {
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              });
              filesToUpload.push(file);
            }
            //   setFiles(
            //     acceptedFiles.map((file) =>
            //       Object.assign(file, {
            //         preview: URL.createObjectURL(file),
            //       })
            //     )
            //   );
            setError('');
          }
          setFiles(filesToUpload.slice(0, 2)); // Limit to only 2 files
        });
      }
    },
    [acceptedFileTypes]
  );

  const { getRootProps, getInputProps, isDragReject, isDragActive } =
    useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png'],
      },
      onDrop,
    });

  const onRemoveFile = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  useEffect(() => {
    return () => {
      onRemoveFile();
    };
  }, []);

  useEffect(() => {
    if (files.length >= 2) setDisabled(true);
    else setDisabled(false);
  }, [files]);

  const rootProps = files.length >= 2 ? {} : getRootProps();

  return (
    <div className="ptw-dropzone-container">
      <div
        {...rootProps}
        className={classNames('ptw-dropzone', {
          'ptw-dropzone__is-active': isDragActive,
          'ptw-dropzone__accepted': files.length > 0 && !error,
          'ptw-dropzone__error': isDragReject || error,
          disabled: disabled,
        })}
      >
        <input {...getInputProps()} />

        {!isDragActive ? (
          <div>
            <i className="ptw-dropzone__icon">
              <FaCloudUploadAlt />
            </i>
            <p className="ptw-dropzone__text">
              Drag and drop your image here or <span>browse files</span>
            </p>
          </div>
        ) : (
          <div>
            <i className="ptw-dropzone__icon">
              <GiFireZone />
            </i>
          </div>
        )}
      </div>
      {/* {files.length > 0 && typeof files !== 'string' && (
        <DropedImg files={files} />
      )} */}
      {files.length > 0 && <DroppedImages files={files} setFiles={setFiles} />}
      {error && <p className="ptw-dropzone__error-msg">{error}</p>}
    </div>
  );
};

export default PtwDropzone;
