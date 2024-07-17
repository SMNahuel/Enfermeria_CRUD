import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { create } from "zustand";
import axios from "axios";

import AxiosInstance from "../helpers/api";

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      client: null,
      crud: {
        nurse: [],
        client: [],
        area: [],
        service: [],
      },
      loading: false,

      /* Modal para Servidce & Area */
      modal: false,
      modalType: 0,
      modalData: null,

      /* Modal para usuarios */
      modalUser: false,
      modalUserData: null,

      /* Modal para confirmar el eliminar usuario */

      modalConfirm: false,

      lang: "en",

      /*------------------------------ Data que tenemos del token */
      init: async () => {
        AxiosInstance.get(`${process.env.REACT_APP_API_URL}/user`)
          .then((r) => {
            set({ user: r.data[0] });
          })
          .catch((err) => {
            console.log(err);
          });
      },

      /*------------------------------ Modal */

      setLang : async (ln) => {
        set({lang: ln})
      },

      // AREA - SERVICE
      closeModal: () => {
        set({ modal: false, modalType: 0, modalData: null });
      },

      openModal: (item, type) => {
        set({ modal: true, modalType: type, modalData: item });
      },

      // USER
      openModalUser: (item) => {
        set({ modalUser: true, modalUserData: item });
      },

      closeModaleUser: () => {
        set({ modalUser: false, modaUserlData: null });
      },

      openModalConfirm: () => {
        set({ modalConfirm: true });
      },

      modalConfirmClose: () => {
        set({ modalConfirm: false });
      },
      /*------------------------------ Autenticación */

      loginUser: (form, navigate) => {
        axios
          .post(`${process.env.REACT_APP_API_URL}/auth/login`, form)
          .then(({ data }) => {
            console.log(data);
            localStorage.setItem("auth", data.token);
            data.user.id = data.user._id;
            set({ user: data.user[0] });
            navigate("/");
          })
          .catch((err) => {
            if (err?.response?.status === 400) {
              toast("Faltan campos");
            }
            if (err?.response?.status === 401) {
              toast("Email o contraseña incorrecto");
            }
          });
      },

      logoutUser: (navigate) => {
        set({ user: null });
        navigate("/");
      },

      register: () => {},

      /* ----------------------------- Selection Nurse  */
      selectNurse: (body) => {
        AxiosInstance.post(`${process.env.REACT_APP_API_URL}/user/request/`, body)
          .then((r) => {
            toast("Felicidades seleccionaste a tu enfermero");
          })
          .catch((err) => {
            console.log(err);

            toast("Problemas al crear");
          });
      },

      /* ----------------------------- Onboarding  */

      uploadImageUser: (img, setFile) => {
        let body = new FormData();
        body.set("key", "3b8489ea2bc0ad9ee80ec4ca5a1dfb27");
        body.append("image", img);
        axios
          .post("https://api.imgbb.com/1/upload", body, {
            ignoreInterceptors: true,
          })
          .then(({ data }) => {
            setFile(data.data.display_url);
          });
      },

      finishOnboarding: (navigate, body, type) => {
        AxiosInstance.post(
          `${process.env.REACT_APP_API_URL}/user/onboarding/${type}`,
          body
        )
          .then((r) => {
            set({user : r.data})
            toast(
              "Felicidades completaste el onboarding seras dirigido al perfil"
            );
            setTimeout(() => {
              navigate("/profile");
            }, 1000);
          })
          .catch((err) => {
            toast("Problemas al crear");
          });
      },

      /* ----------------------------- Crud*/

      initCrud: () => {
        set({ loading: true });
        set({ modal: false });
        AxiosInstance.get(`${process.env.REACT_APP_API_URL}/crud`)
          .then(({ data }) => {
            set({ crud: data });
          })
          .catch((err) => {
            toast(err.response.data);
          });

        set({ loading: false });
      },
      /* ------------ Servicio*/

      /* ------------ Area*/

      create: (dest, item) => {
        AxiosInstance.post(`${process.env.REACT_APP_API_URL}/crud/${dest}`, item)
          .then((response) => {
            set((state) => ({
              crud: {
                ...state.crud,
                [dest]: response.data,
              },
            }));
            toast(`${dest} creada`);
          })
          .catch((err) => {
            toast(err.response.data);
          })
          .finally(() => {});
      },

      deleteRequest: (dest, item) => {
        AxiosInstance.delete(`${process.env.REACT_APP_API_URL}/crud/${dest}/${item.name}`)
          .then((response) => {
            set((state) => ({
              crud: {
                ...state.crud,
                [dest]: response.data,
              },
            }));
            toast(`${dest} eliminada`);
          })
          .catch((err) => {
            toast(err.response.data);
          });
      },

      update: (dest, item) => {
        AxiosInstance.put(
          `${process.env.REACT_APP_API_URL}/${dest.toLowerCase()}/${item._id}`,
          item
        )
          .then((response) => {
            set((state) => ({
              crud: {
                ...state.crud,
                [dest.toLowerCase()]: response.data,
              },
            }));

            toast(`${dest} actualizado`);
            set({ modal: false });
            set({ modalType: 0 });
            set({ modalData: null });
          })
          .catch((err) => {
            toast(err.response.data);
          });
      },

      /* ------------ User*/
      deleteUser: (item, dest) => {
        AxiosInstance.delete(`${process.env.REACT_APP_API_URL}/crud/${dest}/${item._id}`)
          .then((response) => {
            set((state) => ({
              crud: {
                ...state.crud,
                [dest]: response.data,
              },
            }));
          })
          .catch((err) => {
            toast(err.response.data);
          });
      },

      updateUser: (data, dest) => {
        AxiosInstance.put(`${process.env.REACT_APP_API_URL}/${dest}/`, data)
          .then((response) => {
            set((state) => ({
              crud: {
                ...state.crud,
                [dest]: response.data,
              },
              modalUser: false,
              modalUserData: null,
            }));
          })
          .catch((err) => {
            toast(err.response?.data);
          });
      },
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
