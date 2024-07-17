import InputComponent from "../input";

const FormComponent = ({ inputs }) => {
  
  return (
    <>
      {Object.values(inputs).map((item, key) => {
        return <InputComponent key={key} item={item}/>;
      })}
    </>
  );
};

export default FormComponent;
