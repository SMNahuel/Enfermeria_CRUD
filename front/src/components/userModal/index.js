import { Modal as BaseModal } from "@mui/base/Modal";
import { styled, css } from "@mui/system";
import PropTypes from "prop-types";
import * as React from "react";
import clsx from "clsx";

// Components
import ButtonComponent from "../button";

//Context
import { useStore } from "../../context";

export default function ModalUser() {
  const { modalUser, modalUserData, updateUser, closeModaleUser, crud } =
    useStore((state) => state);

  const [user, setUser] = React.useState();
  const [nurse, setNurse] = React.useState({
    service: [],
    area: null,
  });
  const [client, setClient] = React.useState({
    province: "",
    street: "",
    numberOfStreet: "",
  });

  React.useEffect(() => {
    setUser(modalUserData);
    if (modalUserData?.rol === 1) {
      setNurse({
        ...nurse,
        area: modalUserData?.Enfermero[0]?.area,
      });
    } else {
      setClient(modalUserData?.Cliente[0]);
    }
  }, [modalUserData, nurse]);

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

  const handleChangeArea = (event) => {
    setNurse({
      ...nurse,
      area: event.target.value,
    });
  };

  const handleUpdateNurse = () => {
    let body = {
      user: user,
      nurse: nurse,
    };

    updateUser(body, "nurse");
  };

  const handleUpdateClient = () => {
    let body = {
      user: user,
      client: client,
    };

    updateUser(body, "client");
  };
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={modalUser}
      onClose={closeModaleUser}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={{ width: 400 }}>
        <h2>Modificar usuario</h2>
        <h3>Datos de usuario</h3>
        <input
          value={user?.name}
          placeholder="Cambiar el nombre"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          value={user?.lastName}
          placeholder="Cambiar el apellido"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          value={user?.email}
          placeholder="Cambiar el correo"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />{" "}
        <input
          value={user?.phone}
          placeholder="Cambiar el telefono"
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <select
          type="select"
          placeholder="Seleccione tipo"
          value={user?.rol}
          onChange={(e) => {
            setUser({
              ...user,
              rol: e.target.value,
            });
          }}
          defaultValue={null}
        >
          <option value={0}>Paciene/Familiar</option>
          <option value={1}>Enfermero</option>
        </select>
        {user?.rol === 1 && (
          <div>
            <h1>Datos del enfermero</h1>
            {crud.service.map((item, key) => {
              return (
                <div key={key} className="ctn_check">
                  <input
                    type="checkbox"
                    className="hidden"
                    name={item.name}
                    id={item.name}
                    onChange={(e) => handleChangeService(e)}
                    value={item._id}
                  />
                  <label for={item.name}>{item.name}</label>
                </div>
              );
            })}
            <div className="ctn_form">
              <select
                type="select"
                placeholder="Seleccione tipo"
                onChange={(e) => handleChangeArea(e)}
                defaultValue={null}
                value={nurse?.area}
              >
                <option value={null} defaultValue={null}>
                  Seleccione un tipo
                </option>
                {crud.area.map((item, key) => {
                  return (
                    <option key={key} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
        {user?.rol === 0 && (
          <div>
            <h1>Datos del cliente</h1>
            <input
              value={client?.province}
              placeholder="Cambiar el nombre de la ciudad"
              onChange={(e) =>
                setClient({ ...client, province: e.target.value })
              }
            />
            <input
              value={client?.street}
              placeholder="Cambiar el nombre de la calle"
              onChange={(e) => setClient({ ...client, street: e.target.value })}
            />
            <input
              value={client?.numberOfStreet}
              placeholder="Cambiar el numero de la calle"
              onChange={(e) =>
                setClient({ ...client, numberOfStreet: e.target.value })
              }
            />
          </div>
        )}
        <ButtonComponent
          text={"Actualizar usuario"}
          type={"xl"}
          func={user?.rol === 0 ? handleUpdateClient : handleUpdateNurse}
        />
      </ModalContent>
    </Modal>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};



const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  overflow: scroll;
  justify-content: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;

  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding-left: 24px;
    padding-right: 24px;
    height: 90%;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  `
);
