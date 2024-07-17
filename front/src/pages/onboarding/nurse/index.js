import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import axios from "axios";

// Componentes


import "../style.css";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../helpers/api";
import { useStore } from "../../../context";
import FooterComponent from "../../../components/footer";
import ButtonComponent from "../../../components/button";

const fileTypes = ["JPG", "PNG", "JPEG"];
const OnboardingPageNurse = () => {
  const { user } = useStore((state) => state);
  
  const [onboarding, setOnboarding] = useState({
    step1: false,
    step2: true,
    step3: true,
  });

  const [nurse, setNurse] = useState({
    description: "",
    registrationNumber: "",
    area: null,
    service: [],
  });

  const [area, setArea] = useState([]);
  const [service, setService] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    
    AxiosInstance.get(`${process.env.REACT_APP_API_URL}/area"`)
      .then(({ data }) => {
        setArea(data);
      })
      .catch((err) => {
        if (err.status === 403) {
          toast("Ups debes iniciar sesion de nuevo");
        }
      });
  }, []);

  useEffect(() => {
    AxiosInstance.get(`${process.env.REACT_APP_API_URL}/service`)
      .then(({ data }) => {
        setService(data);
      })
      .catch((err) => {
        console.log(err);
        toast("Ups problemas");
      });
  }, []);

  useEffect(() => {
    if (user.rol !== 1) {
      navigate("/");
    }
  }, []);
  const handleChange = async (img) => {
    let body = new FormData();
    body.set("key", "3b8489ea2bc0ad9ee80ec4ca5a1dfb27");
    body.append("image", img);
    axios
      .post("https://api.imgbb.com/1/upload", body, {
        ignoreInterceptors: true,
      })
      .then(({ data }) => {
        setFile(data.data.display_url);
      });
  };

  const handleFirstStep = () => {
    setOnboarding({
      step1: false,
      step2: true,
      step3: true,
    });
  };

  const handleSecondStep = () => {
    if (file == null) {
      toast("Porfavor suba una imagen suya");
      return;
    }
    setOnboarding({
      step1: true,
      step2: false,
      step3: true,
    });
  };

  const lastStep = () => {
    if (
      nurse.registrationNumber === "" ||
      nurse.registrationNumber.length < 5
    ) {
      toast(
        "Complete esta parte para continuar no puede estar vacia ni tener menos de 5 caracteres"
      );
      return;
    }
    setOnboarding({
      step1: true,
      step2: true,
      step3: false,
    });
  };

  const handleChangeArea = (event) => {
    setNurse({
      ...nurse,
      area: event.target.value,
    });
  };

  const handleChangeService = (item) => {
    let aux = nurse.service;

    if (item.target.checked) {
      aux.push(item.target.value);
      setNurse({
        ...nurse,
        service: aux,
      });
    } else {
      aux = aux.filter((elem) => elem === item.target.value);
      setNurse({
        ...nurse,
        service: aux,
      });
    }
  };
  const handleFinishOnboarding = () => {
    const body = {
      description: nurse.description,
      area: nurse.area,
      photo: file,
      service: nurse.service,
      registrationNumber: nurse.registrationNumber,
    };

    AxiosInstance.post(`${process.env.REACT_APP_API_URL}/nurse`, body)
      .then((r) => {
        navigate("/");
      })
      .catch((err) => {
        toast("Problemas al crear");
      });
  };
  return (
    <>
      <FooterComponent />
      {!onboarding.step1 && (
        <div className="ctn_onboarding">
          <h1>Necesitamos una foto tuya</h1>

          <FileUploader
            handleChange={(e) => handleChange(e)}
            name="file"
            types={fileTypes}
            children={
              <div className="ctn_photo">
                <img src={file} />
              </div>
            }
          />
          <div>
            <ButtonComponent text={"Atras"} type="xl" />
            <ButtonComponent
              text={"Siguiente"}
              type="xl"
              func={handleSecondStep}
            />
          </div>
        </div>
      )}
      {!onboarding.step2 && (
        <div className="ctn_onboarding">
          <h1>Indicanos tu numero de matricula</h1>
          <div className="ctn_form_input">
            <input
              placeholder="Ingresa numero de matricula"
              maxLength={5}
              onChange={(e) =>
                setNurse({ ...nurse, registrationNumber: e.target.value })
              }
              value={nurse.registrationNumber}
            />
          </div>
          <div>
            <ButtonComponent text={"Atras"} type="xl" func={handleFirstStep} />
            <ButtonComponent text={"Siguiente"} type="xl" func={lastStep} />
          </div>
        </div>
      )}
      {!onboarding.step3 && (
        <div className="ctn_onboarding">
          <h1>
            Ahora danos una breve descripción de ti para poder mostrar a la hora
            que te elijan
          </h1>
          <textarea
            className="comment"
            onChange={(e) => {
              setNurse({ ...nurse, description: e.target.value });
            }}
            minLength={200}
          >
            {nurse.description}
          </textarea>
          <h1>Indicanos tus especialidad</h1>

          <div className="ctn_form">
            <select
              type="select"
              placeholder="Seleccione tipo"
              onChange={(e) => handleChangeArea(e)}
              defaultValue={null}
            >
              <option value={null} defaultValue={null}>
                Seleccione un tipo
              </option>
              {area.map((item, key) => {
                return (
                  <option key={key} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <h1>Indicanos los servicios que podrias cubrir</h1>
          <div>
            {service.map((item, key) => {
              return (
                <div key={key} className="ctn_check">
                  <input
                    type="checkbox"
                    class="hidden"
                    name={item.name}
                    id={item.name}
                    onChange={(e) => handleChangeService(e)}
                    value={item._id}
                  />
                  <label for={item.name}>{item.name}</label>
                </div>
              );
            })}
          </div>
          <div>
            <ButtonComponent
              text={"Atras"}
              type="xl"
              func={handleSecondStep}
            />
            <ButtonComponent
              text={"Finalizar"}
              type="xl"
              func={handleFinishOnboarding}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingPageNurse;
