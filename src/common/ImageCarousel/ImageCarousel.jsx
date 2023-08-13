import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import './ImageCarousel.scss';

const ImageCarousel = ({ images, clickHandler }) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < images.length - 1) setIndex(index + 1);
  };

  return (
    <div className="carousel">
      <div
        className={`carousel__controls-left carousel__controls ${
          index === 0 ? 'disabled' : ''
        }`}
        onClick={handlePrev}
      >
        <i>
          <FiChevronLeft />
        </i>
      </div>
      <div
        className={`carousel__controls-right carousel__controls ${
          index === images.length - 1 ? 'disabled' : ''
        }`}
        onClick={handleNext}
      >
        <i>
          <FiChevronRight />
        </i>
      </div>
      {images.map((image, imageIndex) => {
        let position;
        if (index < imageIndex) {
          position = 'nextImage';
        }
        if (index === imageIndex) {
          position = 'activeImage';
        }
        if (imageIndex < index) {
          position = 'lastImage';
        }
        return (
          <div
            key={`image-${imageIndex}`}
            className={`carousel__img ${position}`}
          >
            <img onClick={clickHandler} src={image} alt="carousel-image" />
          </div>
        );
      })}
    </div>
  );
};

export default ImageCarousel;
