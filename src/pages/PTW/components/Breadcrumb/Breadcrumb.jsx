import { BiChevronRight } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Breadcrumb.scss';

const Breadcrumb = ({ paths, setActiveSubCategory, activeSubCategory }) => {
  const [activePaths, setActivePaths] = useState(paths);
  const navigate = useNavigate();
  const handleClick = (idx) => {
    if (idx === 1) {
      setActiveSubCategory(null);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (activeSubCategory) {
      setActivePaths([...paths, activeSubCategory]);
    } else {
      setActivePaths(paths);
    }
  }, [activeSubCategory]);

  return (
    <div className="ptw-breadcrumb">
      {activePaths.map((navItem, idx) => {
        const { label } = navItem;
        return (
          <span
            key={idx}
            onClick={() => handleClick(idx)}
            className="ptw-breadcrumb__item"
          >
            {idx !== 0 && (
              <span>
                <BiChevronRight />
              </span>
            )}
            <p>{label}</p>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
