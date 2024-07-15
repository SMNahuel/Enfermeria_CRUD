import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import FooterComponent from "../../components/footer";
import ButtonComponent from "../../components/button";

//Store
import { useStore } from "../../context";

import "./style.css";


const ProfilePage = () => {
  const { user, init } = useStore((state) => state);

  const navigate = useNavigate();

  const handleReview = (id) => {
    navigate(`/profile/review/${id}`);
  };

  const handleMessage = (clientId, nurseId) => {
    navigate(`/profile/message/${clientId}/${nurseId}`);
  };

  useEffect(() =>{
    init()
  },[init])

  return (
    <>
      <FooterComponent />

      <div className="ctn_profile">
        <div className="ctn_profile_left">
          <img alt="photouser" src={user?.photo} />
          <p>{user.email}</p>
          <p>{user.name}</p>
          <p>{user.lastName}</p>
          <p>{user.phone}</p>
          <p>Tipo de usuario: {user?.rol === 0 ? "Cliente" : "Enfermero"}</p>
        </div>
        <div className="ctn_profile_right">
          <div className="ctn_request">
            {user.Cliente[0]?.Enfermero && <h1>Sus Enfermeros</h1>}
            {
              <div>
                {user &&
                  user.Cliente[0]?.Enfermero[0]?.length !== 0 &&
                  user.Cliente[0]?.Enfermero.map((item, key) => {
                    return (
                      <div key={key} className="ctn_request_nurse">
                        <img src={item.Usuario[0].photo} alt="PhotoUser" />

                        <div>
                          <p>
                            {item.Usuario[0].name} {item.Usuario[0].lastName}
                          </p>
                          <p>{item.Usuario[0].email}</p>
                          <p>{item.Usuario[0].phone}</p>
                          <div className="ctn_request_nurse_btn">
                            <ButtonComponent
                              text="Ver mensaje"
                              type="xl"
                              func={() => handleMessage(user._id, item._id)}
                            />
                            <ButtonComponent
                              text="Calificar"
                              type="xl"
                              func={() => handleReview(item._id)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            }
            {user.Enfermero[0]?.Usuario && <h1>Sus cliente</h1>}
            {user &&
              user.Enfermero[0]?.Usuario.map((item, key) => {
                return (
                  <div key={key} className="ctn_request_nurse">
                    <img src={item?.photo} alt="PhotoUser" />

                    <div>
                      <p>
                        {item?.name} {item?.lastName}
                      </p>
                      <p>{item?.email}</p>
                      <p>{item?.phone}</p>
                      <div className="ctn_request_nurse_btn">
                        <ButtonComponent
                          text="Ver mensaje"
                          type="xl"
                          func={() => handleMessage(item._id, user.idNurse)}
                        />
                        <ButtonComponent
                          text="Calificar"
                          type="xl"
                          func={() => handleReview(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
