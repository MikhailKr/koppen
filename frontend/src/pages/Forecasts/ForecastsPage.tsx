import React from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";
import { PageContainerStyled } from "../../shared/widgets/SharedStyles";
import { appRoutes } from "../../app/appRoutes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ForecastsPage: React.FC = () => {
  const { farmId, forecastId } = useParams();

  const navigate = useNavigate();

  return (
    <PageContainerStyled>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <IconButton
          onClick={() =>
            navigate(generatePath(appRoutes.farmView, { id: farmId }))
          }
          size="large"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Forecast 1</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h3">
          Здесь будут прогнозы для {farmId} and {forecastId}
        </Typography>
      </Box>
    </PageContainerStyled>
  );
};
