import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { useWindFarmInfo } from "../../entities/WindFarm/useWindFarmInfo";

export const WindFarmInfoPage: React.FC = () => {
  const { id: windFarmId } = useParams();
  const { data, isLoading, forecasts, isForecastsLoading } = useWindFarmInfo(
    windFarmId || "",
  );

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

  if (!data) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {data.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {data.description}
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">General Information</Typography>
        <Typography>
          Coordinates: {data.latitude}, {data.longitude}
        </Typography>
        <Typography>Granularity: {data.granularity}</Typography>
        <Typography>Horizon: {data.horizon}</Typography>
        <Typography>Update Frequency: {data.updateFrequency}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Turbines</Typography>
        <List>
          {data.turbines.map((turbine, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Model: ${turbine.model}`}
                secondary={`Number: ${turbine.number}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Power Forecast
        </Typography>
        {isForecastsLoading ? (
          <Box textAlign="center" py={2}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Loading forecast data...
            </Typography>
          </Box>
        ) : (
          <List>
            {forecasts.map((f, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Time: ${new Date(f.timestamp).toLocaleString()}`}
                    secondary={`Power Output: ${f.powerOutput} MW`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};
