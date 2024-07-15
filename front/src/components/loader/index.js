import { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  borderColor: "red",
};

const LoaderComponent = ({loading}) => {
  const [color] = useState("#de3a01");
  return (
    <div className="ctn_loading">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoaderComponent;
