import React, {  useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";

// Componentes
import FooterComponent from "../../components/footer";
import ButtonComponent from "../../components/button";
import LoaderComponent from "../../components/loader";


const RegisterPage = () => {
  

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    phone: "",
    password: "",
    email: "",
    rol: null,
    onboarding: false,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleRegister = () => {
    setLoading(true);
    axios
      .post(`${process.env.API_URL}/auth/register`, form)
      .then(() => {
        navigate("/login");
      })
      .finally(setLoading(false))
      .catch((err) => {
        if (err.response.status === 400) {
          toast("Faltan campos");
        }
        if (err.response.status === 401) {
          toast("Email ya registrado");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <FooterComponent />
      <div className="ctn">
        <div className="ctn_form">
          <div className="ctn_form_name">
            <div className="ctn_form_input_name">
              <input
                onChange={(e) => handleForm(e)}
                value={form.name}
                name="name"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="ctn_form_input_name">
              <input
                onChange={(e) => handleForm(e)}
                value={form.lastName}
                name="lastName"
                placeholder="Apellido"
                required
              />
            </div>
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.email}
              name="email"
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.phone}
              name="phone"
              placeholder="Telefono"
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.password}
              name="password"
              placeholder="Contraseña"
              type="password"
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.repeatPassword}
              name="repeatPassword"
              placeholder="Repetir contraseña"
              type="password"
              required
            />
          </div>
          <div className="ctn_form_radio_button">
            <select
              type="select"
              placeholder="Seleccione tipo"
              onChange={(e) => {
                setForm({
                  ...form,
                  rol: e.target.value,
                });
              }}
              defaultValue={null}
            >
              <option value={null} defaultValue={null}>
                Seleccione un tipo
              </option>
              <option value={0}>Paciente</option>
              <option value={1}>Enfermero</option>
            </select>
          </div>
          <ButtonComponent
            
            type={"xl"}
            text={"Registrar"}
            func={handleRegister}
          />{" "}
          <p>
            Ya tienes cuenta?{"  "}
            <ButtonComponent
              type={"normal"}
              text="Ingresa"
              func={handleLogin}
            />{" "}
          </p>
        </div>
      </div>
      {loading && <LoaderComponent loading={loading} />}
    </>
  );
};

export default RegisterPage;
