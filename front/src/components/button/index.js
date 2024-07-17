import './style.css'
const ButtonComponent = ({ text, func, type, color }) => {
  return (
    <>
      <button className={`${type}_${color}`} onClick={() => func()}>
        {text}
      </button>
    </>
  );
};

export default ButtonComponent;
