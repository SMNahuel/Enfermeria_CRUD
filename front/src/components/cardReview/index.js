import { useEffect, useState } from "react";

// Helper
import AxiosInstance from "../../helpers/api";

//Style
import "./style.css";

const CardReview = ({ review }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    AxiosInstance.get(
      `${process.env.API_URL}client/client/${review.idClient}`
    ).then(({ data }) => {
      setUser(data);
    });
  }, [review.idClient]);

  return (
    <div className="ctn_card_review">
      {user && (
        <>
          <h1>{user.name}</h1>
          <p> {review.content}</p>
        </>
      )}
    </div>
  );
};

export default CardReview;
