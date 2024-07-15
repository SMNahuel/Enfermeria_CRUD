import React from "react";
import ButtonComponent from "../button";
import "./style.css";
import { useNavigate } from "react-router-dom";

const NurseCardComponent = ({ item }) => {
  const navigate = useNavigate();
  
  const handleReview = () => {
    navigate(`/nurse/review/${item._id}`);
  };
  const handleSelect = () => {
    navigate(`/nurse/select/${item._id}`);
  };
  return (
    <div className="ctn_cardNurse">
      <div className="left">
        <div className="left_photo">
          <img src={item.photo} alt="photo_nurse"/>
        </div>
        <p>Tipo de consulta</p>
        <p>Online</p>
        <p>Presencial</p>
        <ButtonComponent
          type={"xl-green"}
          text={"Ver reseñas"}
          func={handleReview}
        />
      </div>

      <div className="right">
        <h2>
          Lic. {item.name} {item.lastName}
        </h2>
        <p>M.N. {item.Enfermero[0].registrationNumber}</p>
        <p>Especialista en {item.Enfermero[0].Area[0]?.name}</p>
        <p>{item.Enfermero[0].description}</p>
        <p>Servicios:</p>
        <ul>
          {item.Enfermero[0].Servicios.map((item, key) => {
            return <li key={key}>{item.name}</li>;
          })}
        </ul>
        <ButtonComponent
          type={"xl"}
          text={"Seleccionar"}
          func={handleSelect}
        />
      </div>
    </div>
  );
};

export default NurseCardComponent;
