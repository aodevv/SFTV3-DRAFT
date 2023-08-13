import './ActionsBtn.scss';

const ActionsBtn = ({
  children,
  className,
  openRef,
  onClick,
  wideParent,
  btnRef,
  sites,
}) => {
  //wideParent is a halper prop to position the dropdown when parent is larger then original width of parent used for positioning

  //   const handleClick = () => {
  //     console.log(workerId);
  //   };
  return (
    <div
      ref={btnRef}
      className={`actions-btn ${sites && 'sites'} ${className} ${
        wideParent && 'wide-parent'
      }`}
    >
      <span onClick={onClick} ref={openRef} className="actions-btn__dots">
        <div />
      </span>
      {children}
    </div>
  );
};

export default ActionsBtn;
