import React from "react";
import { useNavigate, useParams, generatePath } from "react-router-dom";
import {
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { PageContainerStyled } from "../../shared/widgets/SharedStyles";
import { appRoutes } from "../../app/appRoutes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useWindFarmInfo } from "../../entities/WindFarm/useWindFarmInfo";
import { useForecastHistory } from "../../entities/Forecasts/useForecastHistory";
import DownloadIcon from "@mui/icons-material/Download";
import { useDownloadForecasts } from "../../entities/Forecasts/useDownloadForecasts";

export const ForecastsPage: React.FC = () => {
  const { farmId, forecastId } = useParams();

  const { windFarm } = useWindFarmInfo(Number(farmId));

  const { isLoading, isError, forecastHistory } = useForecastHistory(
    Number(farmId),
    Number(forecastId),
  );

  const { downloadForecast } = useDownloadForecasts();

  const navigate = useNavigate();

  const forecast = windFarm?.forecasts[0]; // .find(x => x.)

  const handleDownload = async (
    forecastDate: string,
    forecastHistoryRecordId: number,
  ) => {
    await downloadForecast(
      forecast?.name ?? "forecast",
      forecastDate,
      forecastHistoryRecordId,
    );
  };

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
        <Typography variant="h4">{forecast?.name}</Typography>
      </Box>
      <Stack direction="column" gap={2}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="column" gap="8px">
              <Typography>
                <strong>Granuality:</strong> {forecast?.granularity}
              </Typography>
              <Typography>
                <strong>Horizon:</strong> {forecast?.horizon}
              </Typography>
              <Typography>
                <strong>Update frequency:</strong>{" "}
                {forecast?.forecast_frequency}
              </Typography>
              <Typography>
                <strong>Email address:</strong> {forecast?.recipients.join(",")}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        <Box>
          <Typography variant="h5">Forecasts</Typography>
          {isLoading && <CircularProgress />}
          {isError && (
            <Alert severity="error" sx={{ width: "100%" }}>
              Error while getting forecast history :(
            </Alert>
          )}
          {forecastHistory && (
            <List>
              {forecastHistory.map((x) => (
                <ListItem
                  key={x.id}
                  divider
                  secondaryAction={
                    <IconButton
                      onClick={() => handleDownload(x.generated_at, x.id)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={new Date(x.generated_at).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Stack>
    </PageContainerStyled>
  );
};
