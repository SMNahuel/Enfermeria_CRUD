import { useNavigate } from "react-router-dom";
import { useStore } from "../../context";
import { useEffect } from "react";

const OnboardingPage = () => {
  const { user,init } = useStore((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    init()
    if (user.onBoarding === true) {
      navigate("profile");
    }
    if (user.onBoarding === false) {
      if (user.rol === 0) {
        navigate("/onboarding/client");
      } else {
        navigate("/onboarding/nurse");
      }
    }
  }, []);
};

export default OnboardingPage;
