import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import FooterComponent from "../../components/footer";

//Helpers
import AxiosInstance from "../../helpers/api";

//Style
import "./style.css";
import ButtonComponent from "../../components/button";
import CardReview from "../../components/cardReview";

const ReviewPage = () => {
  const [nurse, setNurse] = useState();
  const [review, setReview] = useState([]);
  const location = useLocation();

  useEffect(() => {
    AxiosInstance.get(
      `${process.env.REACT_APP_API_URL}/nurse/${location.pathname.split("/")[3]}`
    )
      .then((r) => {
        setNurse(r.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    AxiosInstance.get(
      `${process.env.REACT_APP_API_URL}/review/${location.pathname.split("/")[3]}`
    )
      .then(({ data }) => {
        setReview(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(nurse);
  return (
    <>
      <FooterComponent />
      <div className="ctn">
        <div className="ctn_nurse_review">
          <div className="ctn_nurse_review_card">
            <div className="ctn_nurse_review_img">
              <img src={nurse?.photo} alt="nurse" />
            </div>
            <div className="ctn_nurse_data">
              <h1>
                Lic. {nurse?.name} {nurse?.lastName}
              </h1>
              <p>Especialista en {nurse?.Enfermero[0].Area[0].name}</p>
              <p>M.N. {nurse?.Enfermero[0].registrationNumber}</p>
              <p>Consultas:</p>
              <p>ONLINE</p>
              <p>PRESENCIAL</p>
            </div>
            <div className="ctn_nurse_point">
              <div>
                <p>Pacientes</p>
                <p>{nurse?.Enfermero[0]?.clients.length}</p>
              </div>
              <div>
                <p>Reviews</p>
                <p>{review.length}</p>
              </div>
            </div>
          </div>
          <h1>Recomendaciones</h1>
          {review !== [] &&
            review.map((item, key) => {
              return <CardReview review={item} key={key} />;
            })}
          <ButtonComponent
            type="xl"
            func={() => console.log("L")}
            text={"Seleccionar Profesional"}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
