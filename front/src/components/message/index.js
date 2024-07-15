import { useEffect, useState } from "react";
import ButtonComponent from "../button";
import AxiosInstance from "../../helpers/api";
import './style.css'
const MessageComponent = ({ item }) => {
  const [state, setState] = useState();
  const [show, setShow] = useState(false);
  useEffect(() => {
    AxiosInstance.get(`${process.env.API_URL}/user/${item.idAuthor}`).then(
      (r) => {
        setState(r.data);
      }
    );
  }, []);

  return (
    <div className="ctn_request_item">
      <p>{item.content}</p>
      {!show && (
        <ButtonComponent
          text={"Ver datos del cliente"}
          func={() => setShow(true)}
        />
      )}
      {show && (
        <>
          <div>
            <div className="ctn_client_data">
              <p>
                {state.name} {state.lastName}
              </p>
              <p>{state.email}</p>
              <p>{state.phone}</p>
            </div>
            <ButtonComponent
              text={"Ocultar datos"}
              func={() => setShow(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageComponent;
