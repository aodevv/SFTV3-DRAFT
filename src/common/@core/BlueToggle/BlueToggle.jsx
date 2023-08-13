import './BlueToggle.scss';

const BlueToggle = ({ isActive, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={`blue-toggle ${isActive && 'active'}`}
    >
      <span className="ball" />
    </div>
  );
};

export default BlueToggle;
