import "./style.css";

const CarrrouselElements = ({ Service, title }) => {
  return (
    <div>
      <h2>{Service.title}</h2>
      <div className="ctn_carrousel">
        <div>
          <div className={`${Service.id}_one`} />
          <p>{Service.one}</p>
        </div>
        <div>
        <div className={`${Service.id}_two`} />
          <p>{Service.two}</p>
        </div>
        <div>
        <div className={`${Service.id}_three`} />
          <p>{Service.three}</p>
        </div>
      </div>
    </div>
  );
};

export default CarrrouselElements;
