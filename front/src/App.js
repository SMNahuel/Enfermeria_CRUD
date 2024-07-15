import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Paginas */
import OnboardingPageClient from "./pages/onboarding/client";
import OnboardingPageNurse from "./pages/onboarding/nurse";
import OnboardingPage from "./pages/onboarding";
import RegisterPage from "./pages/register";
import LoginPages from "./pages/login";
import NursePage from "./pages/nurse";
import HomePages from "./pages/home";
import CrudPage from "./pages/crud";

import { useStore } from "./context";
import ProfilePage from "./pages/profile";
import SelectNursePage from "./pages/nurse/select";
import MessagePage from "./pages/message";
import ReviewPage from "./pages/review";
import ReviewNurse from "./pages/profile/review";
import { useEffect } from "react";
/* Store */

export const App = () => {
  const { user, init, initCrud } = useStore((state) => state);
  
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      if (user === null) {
        init();
      }
      if (user?.rol === 2) {
        initCrud();
      }
    }
  }, [init, initCrud, user?.rol, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/nurse" element={<NursePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPages /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/crud"
          element={user?.rol === 2 ? <CrudPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={
            user?.onBoarding ? (
              <ProfilePage />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        <Route
          path="/profile/review/:id"
          element={user ? <ReviewNurse /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile/message/:idClient/:idNurse"
          element={user ? <MessagePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/onboarding"
          element={user ? <OnboardingPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/nurse/select/:id"
          element={
            user ? <SelectNursePage /> : <Navigate to="/register" replace />
          }
        />
        <Route path="/nurse/review/:id" element={<ReviewPage />} />
        <Route path="/onboarding/nurse" element={<OnboardingPageNurse />} />
        <Route path="/onboarding/client" element={<OnboardingPageClient />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
