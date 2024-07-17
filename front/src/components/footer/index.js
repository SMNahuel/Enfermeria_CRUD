import React from "react";

import { useNavigate } from "react-router-dom";

import "./style.css";

//Component
import ButtonComponent from "../button";

// Helpers

import { useStore } from "../../context";
import { HomeConstat } from "../../constant/HomeConstant";

const FooterComponent = () => {
  const { logoutUser, setLang, lang } = useStore((state) => state);

  const navigate = useNavigate();
  const handleDeleteTokenb = async () => {
    localStorage.removeItem("auth");
  };

  const handleLogout = () => {
    handleDeleteTokenb().then(() => {
      logoutUser(navigate);
    });
  };

  return (
    <div className="ctn">
      <div className="ctn_footer">
        <div className="ctn_btn_img">
          <h3 onClick={() => navigate("/")}>HealtCare</h3>
        </div>
        <p onClick={() => setLang("es")}>Es</p>
        <p onClick={() => setLang("en")}>En</p>
        <div className="ctn_footer_btn">
          <a href="/login">
            <p>{HomeConstat[lang].forDoc}</p>
          </a>
          <a href="/login">
            <p>{HomeConstat[lang].forPat}</p>
          </a>
          <a href="/register">
            <p>{HomeConstat[lang].resourcer}</p>
          </a>
          <a href="/register">
            <p>{HomeConstat[lang].FAQ}</p>
          </a>
        </div>
        <div className="ctn_btn_contact">
          <ButtonComponent
            type={"s"}
            color="blue"
            text={HomeConstat[lang].login}
            func={() => navigate("/login")}
          />
          <ButtonComponent
            type={"s"}
            color="white"
            text={HomeConstat[lang].sing}
            func={() => navigate("/register")}
          />
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
