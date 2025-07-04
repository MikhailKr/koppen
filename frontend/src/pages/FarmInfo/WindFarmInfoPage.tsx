import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { useWindFarmInfo } from "../../entities/WindFarm/useWindFarmInfo";
import WindFarmTurbines from "./WindFarmTurbines";
import WindFarmForecasts from "./WindFarmForecasts";
import { WindFarmGeneralnfo } from "./WindFarmGeneralnfo";

export const WindFarmInfoPage: React.FC = () => {
  const { id: windFarmId } = useParams();
  const { windFarm, isLoading, isError } = useWindFarmInfo(Number(windFarmId));

  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading wind farm data...
        </Typography>
      </Container>
    );
  }

  if (!windFarm || isError)
    return (
      <Typography variant="h6" sx={{ mt: 2 }}>
        Some error happend :(
      </Typography>
    );

  return (
    <Container maxWidth="sm">
      <Box mt={5} display="flex" flexDirection="column" gap={4}>
        <WindFarmGeneralnfo windFarm={windFarm} />
        <WindFarmTurbines fleets={windFarm.wind_turbine_fleet} />
        <WindFarmForecasts
          forecasts={windFarm.forecasts}
          windFarmId={windFarm.id}
          windFarmName={windFarm.name}
        />
      </Box>
    </Container>
  );
};
