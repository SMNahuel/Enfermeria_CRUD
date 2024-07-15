import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { toast } from "react-toastify";

// Store
import { useStore } from "../../../context";

// Componentes
import FooterComponent from "../../../components/footer";
import ButtonComponent from "../../../components/button";

import "../style.css";

const fileTypes = ["JPG", "PNG", "JPEG"];
const OnboardingPageClient = () => {
  const { finishOnboarding, user, uploadImageUser } = useStore(
    (state) => state
  );

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [onboarding, setOnboarding] = useState({
    step1: false,
    step2: true,
  });

  const [client, setClient] = useState({
    street: "",
    numberOfStreet: "",
    province: "",
  });

  
    if (user.rol !== 0) {
      navigate("/");
    }
  

  const handleChange = async (img) => {
    uploadImageUser(img, setFile);
  };
  const handleFirstStep = () => {
    setOnboarding({
      step1: !onboarding.step1,
      step2: !onboarding.step2,
    });
  };

  const handleSecondStep = () => {
    if (file) {
      setOnboarding({
        step1: !onboarding.step1,
        step2: !onboarding.step2,
      });
    } else {
      toast("Debes subir una foto ");
    }
  };

  const handleFinishOnboarding = () => {
    if (client.numberOfStreet && client.province && client.street) {
      const body = {
        numberOfStreet: client.numberOfStreet,
        province: client.province,
        street: client.street,
        photo: file,
        email: user.email
      };
      finishOnboarding(navigate, body, "client");
    } else {
      toast("Debes completar todos los campos ");
    }
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
                <img src={file} alt="userPhoto"/>
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
          <h1>Indicanos en que provincia vives</h1>
          <div className="ctn_form_input">
            <input
              placeholder="Ingrese su provincia"
              onChange={(e) =>
                setClient({ ...client, province: e.target.value })
              }
              value={client.province}
            />
          </div>
          <h1>Dimos la dirección donde recibiras al enfermero</h1>
          <div className="ctn_form_input">
            <input
              placeholder="Ingrese su calle"
              onChange={(e) => setClient({ ...client, street: e.target.value })}
              value={client.street}
            />
          </div>
          <div className="ctn_form_input">
            <input
              placeholder="Ingrese su numero de calle"
              onChange={(e) =>
                setClient({ ...client, numberOfStreet: e.target.value })
              }
              value={client.numberOfStreet}
            />
          </div>
          <div>
            <ButtonComponent text={"Atras"} type="xl" func={handleFirstStep} />
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

export default OnboardingPageClient;
