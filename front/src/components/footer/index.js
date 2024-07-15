import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./style.css";
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from "react-floating-button-menu";
//Component
import ButtonComponent from "../button";

// Helpers

import { useStore } from "../../context";

const FooterComponent = () => {
  const { logoutUser, user } = useStore((state) => state);

  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCRUD = () => {
    navigate("/crud");
  };

  const handleDeleteTokenb = async () => {
    localStorage.removeItem("auth")
  }


  const handleLogout = () => {
    handleDeleteTokenb()
    .then(() => {
    logoutUser(navigate);
    })
  };

  return (
    <div className="ctn">
      <div className="ctn_footer">
        <div className="ctn_btn_img">
          <img className="logo" src="/Logo.png" alt="Logo" />
        </div>
        <div className="ctn_footer_btn">
          <a href="/">
            <p>Servicio</p>
          </a>
          <a href="/nurse">
            <p>Enfermeros</p>
          </a>
          <a href="/register">
            <p>Unete al equipo</p>
          </a>
        </div>
        <div className="ctn_btn_contact">
          {user ? (
            <div>
              <div className="ctn_menu">
                <FloatingMenu
                  slideSpeed={500}
                  direction="down"
                  spacing={5}
                  isOpen={isOpen}
                >
                  <MainButton
                    iconResting={<p>Menu</p>}
                    iconActive={<p>X</p>}
                    backgroundColor="black"
                    onClick={() => setOpen(!isOpen)}
                    size={56}
                  />

                  {user.rol === 2 ? (
                    <ChildButton
                      icon={<p>CRUD</p>}
                      backgroundColor="white"
                      size={40}
                      onClick={handleCRUD}
                    />
                  ) : (
                    <ChildButton
                      icon={<p>Perfil</p>}
                      backgroundColor="white"
                      size={40}
                      onClick={handleProfile}
                    />
                  )}
                  <ChildButton
                    icon={<p>Salir</p>}
                    backgroundColor="white"
                    size={40}
                    onClick={handleLogout}
                  />
                </FloatingMenu>
              </div>
            </div>
          ) : (
            <ButtonComponent text={"Ingresar"} func={handleLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
