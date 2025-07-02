import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../pages/Login/LoginPage";
import MainPage from "../pages/Main/MainPage";
import { useAuth } from "../shared/contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import { appRoutes } from "./appRoutes";
import Header from "../shared/widgets/Header/Header";
import { AddWindFarmPage } from "../pages/AddWindFarm/AddWindFarmPage";
import { AnalyticsPage } from "../pages/Analytics/AnalyticsPage";
import { ForecastsPage } from "../pages/Forecasts/ForecastsPage";
import EditWindFarmPage from "../pages/EditWindFarm/EditWindFarmPage";
import { WindFarmInfoPage } from "../pages/FarmInfo/WindFarmInfoPage";
import { AppProvider } from "../shared/contexts/AppProviderContext";

const FallbackRedirect: React.FC = () => {
  const { user } = useAuth();

  return <Navigate to={user ? appRoutes.projects : appRoutes.login} replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Header />

        <Routes>
          <Route path={appRoutes.login} element={<LoginPage />} />

          <Route
            path={appRoutes.projects}
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />

          <Route path={appRoutes.farmAdd} element={<AddWindFarmPage />} />

          <Route path={appRoutes.farmEdit} element={<EditWindFarmPage />} />

          <Route path={appRoutes.farmView} element={<WindFarmInfoPage />} />

          <Route path={appRoutes.analytics} element={<AnalyticsPage />} />

          <Route path={appRoutes.forecasts} element={<ForecastsPage />} />

          <Route path="*" element={<FallbackRedirect />} />
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
