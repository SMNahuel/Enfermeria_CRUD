const InputComponent = ({ item }) => {
  return (
    <>
      <div className="ctn_form_input">
        <input
          //onChange={(e) => handleForm(e)}
          placeholder={item}
          //name="password"
          //type="password"
        />
      </div>
    </>
  );
};

export default InputComponent;
