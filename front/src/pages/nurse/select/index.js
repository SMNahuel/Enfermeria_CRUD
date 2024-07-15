import { useEffect, useState } from "react";

//Components
import FooterComponent from "../../../components/footer";
import ButtonComponent from "../../../components/button";

//Estilos
import "./style.css";

//Store
import { useLocation, useNavigate } from "react-router-dom";

//Helpers
import AxiosInstance from "../../../helpers/api";
import { useStore } from "../../../context";

const SelectNursePage = () => {
  const { selectNurse, user } = useStore();

  const [state, setState] = useState({
    msj: null,
  });

  const [nurse, setNurse] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectNurse = () => {
    if (!user.idClient) {
      navigate("/onboarding");
    } else {
      let body = {
        idClient: user.idClient,
        msj: state.msj,
        idNurse: nurse.Enfermero[0]._id,
      };

      selectNurse(body);
    }
  };

  useEffect(() => {
    AxiosInstance.get(
      `${process.env.API_URL}/nurse/${location.pathname.split("/")[3]}`
    )
      .then((r) => {
        setNurse(r.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <FooterComponent />
      <div className="ctn_title">
        <h1>Hola {user.name}</h1>
        <h1>Tu enfermero será</h1>
      </div>
      <div className="ctn">
        <div className="ctn_select">
          <div className="ctn_select_left">
            <img src={nurse?.photo} />
            <p>DATOS DE CONTACTO</p>
            <p>Telefono</p>
            <p>{nurse?.phone}</p>
            <p>Mail:</p>
            <p>{nurse?.email}</p>
          </div>
          <div className="ctn_select_nurse">
            <h2>
              Lic. {nurse?.name} {nurse?.lastName}
            </h2>
            <p>Especialista en {nurse?.Enfermero[0].Area[0].name}</p>
            <p className="ctn_select_nurse_description">
              {nurse?.Enfermero[0].description}
            </p>
            <h1>Deja un mensaje a tu enfermero</h1>
            <textarea
              className="comment"
              placeholder="Ingrese su texto"
              onChange={(e) =>
                setState({
                  ...state,
                  msj: e.target.value,
                })
              }
            >
              {state.description}
            </textarea>
            <ButtonComponent
              text={"Enviar solicitud"}
              func={handleSelectNurse}
              type={"xl"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectNursePage;
