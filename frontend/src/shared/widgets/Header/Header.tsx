import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../../app/appRoutes";
import { useAuth } from "../../contexts/AuthContext";
import type { FC } from "react";
import logo from "../../koppen_logo_color.png";

const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(appRoutes.login);
  };

  if (location.pathname === appRoutes.login) {
    return null;
  }

  const currentTab = [
    appRoutes.projects,
    appRoutes.forecasts,
    appRoutes.analytics,
  ].includes(location.pathname)
    ? location.pathname
    : false;

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid #EEEEEE", px: 4, py: 1.5 }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1.5} flexDirection="row">
          <img src={logo} width={300} />
        </Box>

        <Box display="flex" alignItems="center" gap={4}>
          <Tabs value={currentTab} textColor="primary" indicatorColor="primary">
            <Tab
              label="Projects"
              value={appRoutes.projects}
              onClick={() => navigate(appRoutes.projects)}
            />
            {/* <Tab
              label="Forecasts"
              value={appRoutes.forecasts}
              onClick={() => navigate(appRoutes.forecasts)}
            />
            <Tab
              label="Analytics"
              value={appRoutes.analytics}
              onClick={() => navigate(appRoutes.analytics)}
            /> */}
          </Tabs>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" color="textPrimary">
              {user}
            </Typography>
            <Avatar sx={{ width: 40, height: 40 }} src="..." />
            <IconButton onClick={handleLogout} color="primary">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
