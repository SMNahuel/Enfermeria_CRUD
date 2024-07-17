import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./style.css";

import { useStore } from "../../context";

// Componentes
import FooterComponent from "../../components/footer";
import ButtonComponent from "../../components/button";
import { RegisterConstant } from "../../constant/RegisterConstant";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { lang } = useStore();

  useEffect(() => {}, [lang]);

  return (
    <>
      <FooterComponent />
      <div className="ctn_register">
        <ButtonComponent
          text={RegisterConstant[lang].selectOption.doc}
          type={"l"}
          color={"blue"}
          func={() => navigate("/register/nurse")}
        />
        <ButtonComponent
          text={RegisterConstant[lang].selectOption.pat}
          type={"l"}
          color={"white"}
          func={() => navigate("/register/patient")}
        />
      </div>
    </>
  );
};

export default RegisterPage;
