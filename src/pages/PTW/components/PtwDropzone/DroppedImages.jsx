import { BsCheckCircle } from 'react-icons/bs';
import { IoClose, IoCheckmarkSharp } from 'react-icons/io5';

import './PtwDropzone.scss';
const DroppedImages = ({ files, setFiles }) => {
  const handleRemove = (name, preview, existing) => {
    if (existing) {
      setFiles(files.filter((item) => item.preview !== preview));
    } else {
      URL.revokeObjectURL(preview);
      setFiles(files.filter((item) => item.name !== name));
    }
  };

  return (
    <div className="ptw-dropped-images">
      {files.map((file) => {
        const { name, preview, size, existing } = file;
        return (
          <div key={preview} className="ptw-dropped-images__item">
            <span className="ptw-dropped-images__item-left">
              <BsCheckCircle />
            </span>
            <div className="ptw-dropped-images__item-infos">
              <div className="dropped-img">
                <img src={preview} alt="dropped-img" />
              </div>
              <div className="dropped-infos">
                {existing ? (
                  <h3>Existing image</h3>
                ) : (
                  <>
                    <h3>{name}</h3>
                    <p>{Math.round(size / 1024)} kb</p>
                  </>
                )}
              </div>
            </div>

            <div className="ptw-dropped-images__item-right">
              <span>
                <IoCheckmarkSharp />
              </span>
              <span onClick={() => handleRemove(name, preview, existing)}>
                <IoClose />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DroppedImages;
