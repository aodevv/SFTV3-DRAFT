import './AddBtn.scss';

const AddBtn = ({ handleClick, title, disabled }) => {
  const click = () => {
    if (!disabled) {
      handleClick();
    }
  };

  return (
    <button onClick={click} className={`add-btn ${disabled && 'disabled'}`}>
      <span>+</span> {title}
    </button>
  );
};

export default AddBtn;
