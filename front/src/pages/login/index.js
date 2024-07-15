import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import FooterComponent from "../../components/footer";
import ButtonComponent from "../../components/button";

// Context
import { useStore } from "../../context";

const LoginPages = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { loginUser, user } = useStore((state) => state);

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogin = () => {
    loginUser(form, navigate);
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <FooterComponent />
      <div className="ctn">
        <div className="ctn_form">
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              placeholder="Email"
              name="email"
              type="email"
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              placeholder="Password"
              name="password"
              type="password"
            />
          </div>
          <ButtonComponent type={"xl"} text="Ingresar" func={handleLogin} />
          <p>
            No tienes cuenta?{"  "}
            <ButtonComponent
              type={"normal"}
              text="Registrate"
              func={handleRegister}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPages;
