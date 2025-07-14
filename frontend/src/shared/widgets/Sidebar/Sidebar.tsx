import { type FC } from "react";
import { Box, Avatar, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { WindFarmsIcon, Logo, MyWindFarmsButton } from "./Sidebar.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../../../app/appRoutes";
import windFarmsIcon from "../../wind_farm_icon.png";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar: FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const location = useLocation();
  const isLoginPage = location.pathname === appRoutes.login;

  return (
    <Box
      sx={{
        width: 120,
        position: "fixed",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        gap: 6,
        flexShrink: 0,
      }}
    >
      <Logo />

      {!isLoginPage && (
        <>
          <Stack alignItems="center" spacing={1}>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Typography variant="body2">{user}</Typography>
          </Stack>

          <Stack alignItems="center" spacing={1}>
            <MyWindFarmsButton onClick={() => navigate(appRoutes.projects)}>
              <WindFarmsIcon src={windFarmsIcon} alt="farms" />
              <Typography variant="body2" textAlign="center">
                My wind farms
              </Typography>
            </MyWindFarmsButton>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
