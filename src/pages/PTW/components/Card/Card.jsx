import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BiChevronRight } from 'react-icons/bi';
import { IoIosCheckmark } from 'react-icons/io';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BlueToggle from '@core/BlueToggle/BlueToggle';
import ImageCarousel from '@common/ImageCarousel/ImageCarousel';
import tempImg from '../../../../assets/ptw/missing.svg';
import './Card.scss';
import {
  updateCategory,
  updateSubcategory,
} from '../../../../redux/ptwSlice/ptwSlice';

const Card = ({
  width,
  data,
  activeSubCategory,
  setSubCategory,
  setCheckedCards,
  setModal,
}) => {
  const navigate = useNavigate();
  const { id, name, image1, image2, status } = data;
  const images = [];
  if (image1) images.push(image1);
  if (image2) images.push(image2);
  const [active, setActive] = useState(status === 1);
  const [checked, setChecked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [toggeled, setToggeled] = useState(false);

  const dispatch = useDispatch();
  const posting = useSelector((state) => state.ptw.posting);
  const [toggleSpin, setToggleSpin] = useState(posting);

  const handleNavigate = () => {
    if (!activeSubCategory && status === 1) {
      setSubCategory({
        label: name,
        value: id,
        ...data,
      });
      navigate(`${id}`);
    }
  };

  const handleCheckboxClick = () => {
    setCheckedCards((prev) => {
      const itemToChange = prev.findIndex((item) => item.id === id);
      const newArray = [...prev];
      newArray[itemToChange] = { id, checked: !checked };
      return newArray;
    });
    setChecked(!checked);
  };

  const handleToggle = () => {
    setToggeled(true);
    const formData = new FormData();
    formData.append('status', status === 1 ? 0 : 1);
    if (activeSubCategory) {
      dispatch(
        updateSubcategory({
          id: data.id,
          data: formData,
        })
      );
    } else {
      dispatch(
        updateCategory({
          id: data.id,
          data: formData,
        })
      );
    }
  };

  const handleEdit = () => {
    setModal({
      show: true,
      edit: true,
      data,
    });
  };

  useEffect(() => {
    if (toggeled) setToggleSpin(posting);
  }, [posting, toggeled]);

  useEffect(() => {
    if (!posting) setToggeled(false);
  }, [posting]);

  return (
    <div
      style={{ width }}
      className={classNames('ptw-card', {
        'ptw-card-small': !!activeSubCategory,
      })}
    >
      <div className="ptw-card__header">
        <span
          onClick={handleCheckboxClick}
          className={classNames('card-checkmark', { checked })}
        >
          <IoIosCheckmark />
        </span>
        {toggleSpin && (
          <div className="ptw-card__header-spinner">
            <i>
              <ImSpinner2 />
            </i>
          </div>
        )}
        <BlueToggle isActive={status === 1} handleClick={handleToggle} />
      </div>
      <div
        className={classNames('ptw-card__content', { disabled: status !== 1 })}
      >
        <div className="ptw-card__content-img">
          {images.length > 0 ? (
            images.length === 1 ? (
              <div>
                {!imgError ? (
                  <img
                    src={images[0]}
                    alt="danger-categories"
                    onError={() => setImgError(true)}
                    onClick={handleEdit}
                  />
                ) : (
                  <img
                    src={tempImg}
                    alt="danger-categories"
                    onClick={handleEdit}
                  />
                )}
              </div>
            ) : (
              <ImageCarousel clickHandler={handleEdit} images={images} />
            )
          ) : (
            <img src={tempImg} alt="danger-categories" onClick={handleEdit} />
          )}
        </div>
        <div
          onClick={handleNavigate}
          className={classNames('ptw-card__content-link', {
            noLink: activeSubCategory,
          })}
        >
          <p>{name}</p>
          {!activeSubCategory && (
            <span>
              <BiChevronRight />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
