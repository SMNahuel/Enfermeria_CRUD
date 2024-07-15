import './style.css'
const ButtonComponent = ({ text, func, type }) => {
  return (
    <>
      <button className={type} onClick={() => func()}>{text}</button>
    </>
  );
};

export default ButtonComponent;
