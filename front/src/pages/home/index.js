
import FooterComponent from "../../components/footer";

import "./style.css";

const HomePages = () => {

  return (
    <>
      <FooterComponent />
      <div className="ctn_home">
        <div className="ctn_home_info">
          <h1>
            Servicio de Enfermería Perzonalizada a tu Domicilio:
            <br />
            Atención que Marca la Diferencia.
          </h1>

          <p>
            Nuestro personal altamente capacitado se esfuerza por ofrecer
            atención profesional con un toque de calidez y empatía. Nos
            dedicamos a asegurarnos de que sus seres queridos se sientan seguros
            y bien atendidos, proporcionando una atención personalizada que se
            adapte a sus necesidades individuales
          </p>
        </div>
        <div className="ctn_home_img">
          <img src="/imagen1.png" alt="image_ilustration"/>
        </div>
      </div>
    </>
  );
};

export default HomePages;
