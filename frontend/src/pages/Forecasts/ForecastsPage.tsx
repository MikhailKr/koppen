import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { PageContainerStyled } from "../../shared/widgets/SharedStyles";

export const ForecastsPage: React.FC = () => {
  const { farmId, forecastId } = useParams();

  return (
    <PageContainerStyled>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h3">
          Здесь будут прогнозы для {farmId} and {forecastId}
        </Typography>
      </Box>
    </PageContainerStyled>
  );
};
