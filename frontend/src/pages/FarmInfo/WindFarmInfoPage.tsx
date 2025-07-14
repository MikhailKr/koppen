import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { useWindFarmInfo } from "../../entities/WindFarm/useWindFarmInfo";
import WindFarmTurbines from "./WindFarmTurbines";
import WindFarmForecasts from "./WindFarmForecasts";
import { WindFarmGeneralnfo } from "./WindFarmGeneralnfo";
import { PageContainerStyled } from "../../shared/widgets/SharedStyles";

export const WindFarmInfoPage: React.FC = () => {
  const { id: windFarmId } = useParams();
  const { windFarm, isLoading, isError, updateFarmInfo } = useWindFarmInfo(
    Number(windFarmId),
  );

  if (isLoading) {
    return (
      <PageContainerStyled>
        <Container sx={{ textAlign: "center", mt: 10 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
            Loading wind farm data...
          </Typography>
        </Container>
      </PageContainerStyled>
    );
  }

  if (!windFarm || isError)
    return (
      <PageContainerStyled>
        <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
          Some error happend :(
        </Typography>
      </PageContainerStyled>
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
          windFarmId={windFarm.id}
          forecasts={windFarm.forecasts}
          onUpdate={updateFarmInfo}
        />
      </Box>
    </PageContainerStyled>
  );
};
