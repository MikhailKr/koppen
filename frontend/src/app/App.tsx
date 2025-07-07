import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../pages/Login/LoginPage";
import MainPage from "../pages/Main/MainPage";
import { appRoutes } from "./appRoutes";
import Header from "../shared/widgets/Header/Header";
import { AddWindFarmPage } from "../pages/AddWindFarm/AddWindFarmPage";
import { WindFarmInfoPage } from "../pages/FarmInfo/WindFarmInfoPage";
import { AppProvider } from "../shared/contexts/AppProviderContext";
import { Background } from "../shared/widgets/Background/Background";
import { useAuth } from "../shared/contexts/AuthContext";

const FallbackRedirect: React.FC = () => {
  const { user } = useAuth();

  return <Navigate to={user ? appRoutes.projects : appRoutes.login} replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Background>
          <Header />

          <Routes>
            <Route path={appRoutes.login} element={<LoginPage />} />

            <Route path={appRoutes.projects} element={<MainPage />} />

            <Route path={appRoutes.farmAdd} element={<AddWindFarmPage />} />

            <Route path={appRoutes.farmView} element={<WindFarmInfoPage />} />

            <Route path={appRoutes.farmView} element={<WindFarmInfoPage />} />

            <Route path="*" element={<FallbackRedirect />} />
          </Routes>
        </Background>
      </AppProvider>
    </Router>
  );
};

export default App;
