import { useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

const CompanyImg = ({ imgUrl }) => {
  const [imgError, setImgError] = useState(false);
  const handleError = () => {
    setImgError(true);
  };
  return imgUrl && !imgError ? (
    <img
      className="worker-company-image"
      src={imgUrl}
      alt="client_logo"
      onError={handleError}
    />
  ) : (
    <div className="missing-image">
      <i>
        <MdOutlineImageNotSupported />
      </i>
    </div>
  );
};

export default CompanyImg;
