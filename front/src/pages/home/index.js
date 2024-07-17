import ButtonComponent from "../../components/button";
import CarrouselElements from "../../components/carrouselHome";
import FooterComponent from "../../components/footer";
import { HomeConstat } from "../../constant/HomeConstant";
import { useStore } from "../../context";

import "./style.css";

const HomePages = () => {
  const { lang } = useStore();
  const Service = [
    {
      name: HomeConstat[lang].service.one,
    },
    {
      name: HomeConstat[lang].service.two,
    },
    {
      name: HomeConstat[lang].service.three,
    },
  ];

  const Us = [
    {
      name: HomeConstat[lang].us.one,
    },
    {
      name: HomeConstat[lang].us.two,
    },
    {
      name: HomeConstat[lang].us.three,
    },
  ];

  const Resource = [
    {
      name: HomeConstat[lang].resource.one,
    },
    {
      name: HomeConstat[lang].resource.two,
    },
    {
      name: HomeConstat[lang].resource.three,
    },
  ];
  return (
    <>
      <FooterComponent />
      <div className="ctn_home">
        <div className="ctn_head">
          <h1>{HomeConstat[lang].title}</h1>
          <div className="ctn_head_btn">
            <ButtonComponent
              text={HomeConstat[lang].showDoctor}
              type={"m"}
              color={"blue"}
            />
            <ButtonComponent
              text={HomeConstat[lang].showCalendary}
              type={"m"}
              color={"white"}
            />
          </div>
        </div>
        <CarrouselElements Service={HomeConstat[lang].service} />
        <CarrouselElements Service={HomeConstat[lang].us} />
        <CarrouselElements Service={HomeConstat[lang].resource} />
      </div>
    </>
  );
};

export default HomePages;
