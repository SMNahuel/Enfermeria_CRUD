import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

//Style
import "./style.css";

//Components
import FooterComponent from "../../../components/footer";
import ButtonComponent from "../../../components/button";

//Helpers
import AxiosInstance from "../../../helpers/api";
import { useStore } from "../../../context";
import { toast } from "react-toastify";

const ReviewNurse = () => {
  const { user } = useStore();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const location = useLocation();

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  const addReview = () => {
    if (content && rating !== 0) {
      let body = {
        idNurse: location.pathname.split("/")[3],
        idClient: user.Cliente[0]._id,
        content: content,
        qualification: rating,
      };

      AxiosInstance.post(`${process.env.REACT_APP_API_URL}/review`, body)
        .then(() => {
          toast("Genial se envio tu review");
        })
        .catch((err) => {
          toast("Hubo un error");
        });
    } else {
      toast("Faltan datos");
    }
  };

  const cancelReview = () => {};

  return (
    <>
      <FooterComponent />
      <div className="ctn">
        <div className="ctn_review_nurse">
          <h1>¿Qué tal estuvo todo?</h1>
          <Rating
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            /* Available Props */
          />
          <h1>Deje un comentario para nuestro enfermero</h1>
          <textarea
            className="comment"
            placeholder="Ingrese su comentario"
            onChange={(e) => setContent(e.target.value)}
          >
            {content}
          </textarea>

          <ButtonComponent text="Enviar" func={addReview} type="xl" />
          <ButtonComponent text="Cancelar" func={cancelReview} type="xl" />
        </div>
      </div>
    </>
  );
};

export default ReviewNurse;
