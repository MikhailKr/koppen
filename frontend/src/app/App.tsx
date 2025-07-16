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
import { AddWindFarmPage } from "../pages/AddWindFarm/AddWindFarmPage";
import { WindFarmInfoPage } from "../pages/FarmInfo/WindFarmInfoPage";
import { AppProvider } from "../shared/contexts/AppProviderContext";
import { Background } from "../shared/widgets/Background/Background";
import { useAuth } from "../shared/contexts/AuthContext";
import { ForecastsPage } from "../pages/Forecasts/ForecastsPage";
import Sidebar from "../shared/widgets/Sidebar/Sidebar";

const FallbackRedirect: React.FC = () => {
  const { user } = useAuth();

  return <Navigate to={user ? appRoutes.projects : appRoutes.login} replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Background>
          <Sidebar />

          <Routes>
            <Route path={appRoutes.login} element={<LoginPage />} />

            <Route path={appRoutes.projects} element={<MainPage />} />

            <Route path={appRoutes.farmAdd} element={<AddWindFarmPage />} />

            <Route path={appRoutes.farmView} element={<WindFarmInfoPage />} />

            <Route path={appRoutes.farmView} element={<WindFarmInfoPage />} />

            <Route path={appRoutes.forecast} element={<ForecastsPage />} />

            <Route path="*" element={<FallbackRedirect />} />
          </Routes>
        </Background>
      </AppProvider>
    </Router>
  );
};

export default App;
