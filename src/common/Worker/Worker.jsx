import avatar from '../../assets/avatar.png';

import './Worker.scss';

const Worker = ({ worker, count, centered, wideWorker }) => {
  const { name, img, position, company } = worker;

  return (
    <div className={`worker-card ${centered && 'centered'}`}>
      <div className={`worker-card__details ${wideWorker && 'wide'}`}>
        {img ? (
          <img className="worker-card__img" src={img} alt="worker-card-img" />
        ) : (
          <img
            className="worker-card__img"
            src={avatar}
            alt="worker-card-img"
          />
        )}

        <div className="worker-card__details-text">
          <h3>{name}</h3>
          <p>{position}</p>
        </div>
      </div>
      {company && (
        <img
          src={company}
          alt="worker-card-company"
          className="worker-card__company"
        />
      )}
    </div>
  );
};

export default Worker;
