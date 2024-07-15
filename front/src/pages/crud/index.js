import React, { useState } from "react";

import "./style.css";

import FooterComponent from "../../components/footer";
import LoaderComponet from "../../components/loader";
import ButtonComponent from "../../components/button";

import { useStore } from "../../context";
import ModalUnstyled from "../../components/modal";
import ModalUser from "../../components/userModal";
import ConfirmModal from "../../components/confirmModal";
const CrudPage = () => {
  const {
    service: storService,
    area: storArea,
    nurse,
    client,
    loading,
  } = useStore((state) => state.crud);

  const { openModal, openModalUser, create, deleteRequest, openModalConfirm } =
    useStore((state) => state);

  const [area, setArea] = useState({
    name: "",
  });
  const [service, setService] = useState({
    name: "",
  });

  const [userDelete, setUserDelete] = useState(null);

  const handleDeleteUser = (item) => {
    setUserDelete(item);
    openModalConfirm();
  };

  return (
    <>
      <FooterComponent />
      <div className="ctn">
        <h1>Lista de enfermeros</h1>
      </div>
      <div className="ctn">
        <div className="ctn_form">
          {nurse.map((item, index) => {
            return (
              <div className="ctn_nurse" key={index}>
                <img alt="photo_nurse" src={item.photo} />
                <p>
                  {item.name} {item.lastName}
                </p>
                <div>
                  <ButtonComponent
                    text="Eliminar"
                    func={() => handleDeleteUser(item)}
                  />
                  <ButtonComponent
                    text="Actualizar"
                    func={() => openModalUser(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ctn">
        <h1>Lista de clientes</h1>
      </div>
      <div className="ctn">
        <div className="ctn_form">
          {client.map((item, index) => {
            return (
              <div className="ctn_nurse" key={index}>
                <img
                  alt="photo_user"
                  src={
                    item.photo
                      ? item.photo
                      : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  }
                />
                <p>
                  {item.name} {item.lastName}
                </p>
                <div>
                  <ButtonComponent
                    text="Eliminar"
                    func={() => handleDeleteUser(item)}
                  />
                  <ButtonComponent
                    text="Actualizar"
                    func={() => openModalUser(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ctn">
        <div className="ctn_form">
          <h1>Lista de areas</h1>
          <div className="ctn_form_input">
            <input
              value={area.name}
              placeholder="Crear un area"
              onChange={(e) => setArea({ name: e.target.value })}
            />
          </div>
          <ButtonComponent text="Crear" func={() => create("area", area)} />
          {storArea.map((item, key) => {
            return (
              <div key={key} className="ctn_area">
                <p>{item.name}</p>
                <div>
                  <ButtonComponent
                    text="Eliminar"
                    func={() => deleteRequest("area", item)}
                  />
                  <ButtonComponent
                    text="Modificar"
                    func={() => openModal(item, "Area")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ctn">
        <div className="ctn_form">
          <h1>Lista de servicios</h1>
          <div className="ctn_form_input">
            <input
              value={service.name}
              placeholder="Crear un servicio"
              onChange={(e) => setService({ name: e.target.value })}
            />
          </div>
          <ButtonComponent
            text="Crear"
            func={() => create("service", service)}
          />
          {storService.map((item, key) => {
            return (
              <div key={key} className="ctn_area">
                <p>{item.name}</p>
                <div>
                  <ButtonComponent
                    text="Eliminar"
                    func={() => deleteRequest("service", item)}
                  />
                  <ButtonComponent
                    text="Modificar"
                    func={() => openModal(item, "Service")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {loading && <LoaderComponet loading={loading} />}
      <ModalUnstyled />
      <ModalUser />
      <ConfirmModal item={userDelete} />
    </>
  );
};

export default CrudPage;
