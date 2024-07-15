import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Style
import "./style.css";

//Components
import FooterComponent from "../../components/footer";
import ButtonComponent from "../../components/button";

//Helper
import AxiosInstance from "../../helpers/api";

//Context
import { useStore } from "../../context";
const MessagePage = () => {
  const { user } = useStore();

  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [recieved, setRecieved] = useState();
  const location = useLocation();
  let idClient = location.pathname.split("/")[3];
  let idNurse = location.pathname.split("/")[4];
  useEffect(() => {
    AxiosInstance.get(`http://localhost:3000/message/${idClient}/${idNurse}`)
      .then(({ data }) => {
        setHistory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (user.rol === 0) {
      AxiosInstance.get(`http://localhost:3000/nurse/nurse/${idNurse}`).then(
        ({ data }) => {
          setRecieved(data);
        }
      );
    }

    if (user.rol === 1) {
      AxiosInstance.get(`http://localhost:3000/client/${idClient}`).then(
        ({ data }) => {
          setRecieved(data);
        }
      );
    }
  }, []);

  const handleSendMessage = () => {
    let who = user.rol === 0 ? true : false;
    AxiosInstance.post(`http://localhost:3000/message/${idClient}/${idNurse}`, {
      content: message,
      who: who,
    })
      .then(({ data }) => {
        setMessage("");
        setHistory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FooterComponent />
      <div className="ctn_message">
        <div className="ctn_message_left">
          {recieved && (
            <div className="ctn_message_left_user">
              <img src={recieved.photo} />
              <p>
                {recieved.name} {recieved.lastName}
              </p>
            </div>
          )}
        </div>
        <div className="ctn_message_right">
          <div className="ctn_message_right_message">
            {history.map((r, key) => {
              return (
                <div key={key}>
                  {user.rol === 0 && (
                    <div
                      className={r.who ? "messageRigth" : "messageLeft"}
                    >
                      <p>{r.content}</p>
                    </div>
                  )}

                  {user.rol === 1 && (
                    <div
                      key={key}
                      className={r.who ? "messageLeft" : "messageRigth"}
                    >
                      <p>{r.content}</p>
                    </div>
                  )}
                </div >
              );
            })}
          </div>
          <div className="ctn_message_right_chat">
            <div className="ctn_form_input">
              <input
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                value={message}
              />
            </div>
            <ButtonComponent
              text="Enviar"
              func={() => handleSendMessage()}
              type="normal"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MessagePage;
