import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import "./style.css";

import { useStore } from "../../context";

// Componentes
import ButtonComponent from "../../components/button";
import LoaderComponent from "../../components/loader";

import RegisterConstant from "../../constant/constant";

const RegisterPagedsa = () => {
  const { lang, setLang } = useStore();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    phone: "",
    password: "",
    email: "",
    rol: null,
    onboarding: false,
  });

  useEffect(() => {}, [lang]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, form)
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
      <div className="ctn">
        <h1>{RegisterConstant[lang].titleRegister}</h1>
        <ButtonComponent text="Ingles" type="sm" func={() => setLang("es")} />
        <ButtonComponent text="Español" type="sm" func={() => setLang("en")} />
        <div className="ctn_form">
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.name}
              name={RegisterConstant[lang].inputRegister.name}
              placeholder={RegisterConstant[lang].inputRegister.name}
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.lastName}
              name={RegisterConstant[lang].inputRegister.lastName}
              placeholder={RegisterConstant[lang].inputRegister.lastName}
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.email}
              name={RegisterConstant[lang].inputRegister.email}
              placeholder={RegisterConstant[lang].inputRegister.email}
              type="email"
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.phone}
              name={RegisterConstant[lang].inputRegister.phone}
              placeholder={RegisterConstant[lang].inputRegister.phone}
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.password}
              name={RegisterConstant[lang].inputRegister.password}
              placeholder={RegisterConstant[lang].inputRegister.password}
              type="password"
              required
            />
          </div>
          <div className="ctn_form_input">
            <input
              onChange={(e) => handleForm(e)}
              value={form.repeatPassword}
              name={RegisterConstant[lang].inputRegister.repeatPassword}
              placeholder={RegisterConstant[lang].inputRegister.repeatPassword}
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

export default RegisterPagedsa;
