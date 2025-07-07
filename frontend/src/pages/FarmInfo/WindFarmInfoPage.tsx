import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { useWindFarmInfo } from "../../entities/WindFarm/useWindFarmInfo";
import WindFarmTurbines from "./WindFarmTurbines";
import WindFarmForecasts from "./WindFarmForecasts";
import { WindFarmGeneralnfo } from "./WindFarmGeneralnfo";
import { PageContainerStyled } from "./WindFarmInfoPage.styles";

export const WindFarmInfoPage: React.FC = () => {
  const { id: windFarmId } = useParams();
  const { windFarm, isLoading, isError, updateFarmInfo } = useWindFarmInfo(
    Number(windFarmId),
  );

  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
          Loading wind farm data...
        </Typography>
      </Container>
    );
  }

  if (!windFarm || isError)
    return (
      <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
        Some error happend :(
      </Typography>
    );

  return (
    <PageContainerStyled>
      <Box display="flex" flexDirection="column" gap={2}>
        <WindFarmGeneralnfo windFarm={windFarm} onUpdate={updateFarmInfo} />
        <WindFarmTurbines
          fleets={windFarm.wind_turbine_fleet}
          onUpdate={updateFarmInfo}
        />
        <WindFarmForecasts
          forecasts={windFarm.forecasts}
          windFarmId={windFarm.id}
          windFarmName={windFarm.name}
          onUpdate={updateFarmInfo}
        />
      </Box>
    </PageContainerStyled>
  );
};
