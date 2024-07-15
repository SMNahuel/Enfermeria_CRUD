import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
//Componentes
import FooterComponent from "../../components/footer";
import NurseCardComponent from "../../components/cardNurse";

const NursePage = (props) => {
  const [nurse, setNurse] = useState([]);
  

  useEffect(() => {
    axios.get(`${process.env.API_URL}/nurse`).then((r) => {
      setNurse(r.data);
    });
  }, []);
  return (
    <>
      <FooterComponent />
      <div className="ctn_nurse">
        <h1>Nuestro Equipo de Enfermería</h1>
        {nurse.map((item, key) => {
          return <NurseCardComponent item={item} key={key} />;
        })}
      </div>
    </>
  );
};

export default NursePage;
