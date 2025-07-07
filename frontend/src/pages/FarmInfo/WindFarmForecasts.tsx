import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Box,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ForecastDb } from "../../shared/api/api";
import EditDialog from "../../shared/widgets/EditDialog/EditDialog";
import { useDownloadForecasts } from "../../entities/Forecasts/useDownloadForecasts";
import { useCreateOrDeleteForecast } from "../../entities/WindFarm/useCreateOrDeleteForecast";

type Props = {
  onUpdate: () => Promise<void>;
  forecasts: ForecastDb[];
  windFarmId: number;
  windFarmName: string;
};

const emptyForecast: ForecastDb = {
  time_resolution: "hour",
  repeat_daily: false,
  daily_time: null,
  repeat_hourly: false,
  hourly_minute: null,
  wind_farm_id: 0,
};

const WindFarmForecasts: React.FC<Props> = ({
  forecasts,
  windFarmId,
  windFarmName,
  onUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [currentForecast, setCurrentForecast] = useState<ForecastDb | null>(
    null,
  );
  const { createForecastRequest, isLoading } = useCreateOrDeleteForecast();

  const { downloadForecast, isFetching } = useDownloadForecasts();

  const openCreate = () => {
    setCurrentForecast(null);
    setOpen(true);
  };

  const handleDelete = () => {
    alert("Deleted...");
  };

  const handleSave = async () => {
    if (currentForecast) {
      await createForecastRequest(currentForecast);
      await onUpdate();
      setOpen(false);
    }
  };

  return (
    <>
      <Backdrop
        open={isFetching}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => downloadForecast(windFarmId, windFarmName)}
          >
            Download forecast
          </Button>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Available Forecasts</Typography>
            <Tooltip title="Add Forecast">
              <IconButton onClick={openCreate}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {forecasts.map((forecast, i) => (
            <Grid
              key={i}
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2, p: 1, border: "1px solid #eee", borderRadius: 1 }}
            >
              <Box>
                <Typography>
                  Time Resolution: {forecast.time_resolution}
                </Typography>
                {forecast.repeat_daily && (
                  <Typography>Daily at: {forecast.daily_time}</Typography>
                )}
                {forecast.repeat_hourly && (
                  <Typography>
                    Hourly at: {forecast.hourly_minute} minutes
                  </Typography>
                )}
              </Box>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
        </CardContent>
      </Card>

      <EditDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
        isLoading={isLoading}
        title={"Add Forecast"}
        submitLabel={"Add"}
      >
        <TextField
          label="Time Resolution"
          fullWidth
          value={currentForecast?.time_resolution ?? ""}
          onChange={(e) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              time_resolution: e.target.value as any,
            }))
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={currentForecast?.repeat_daily ?? false}
              onChange={(e) =>
                setCurrentForecast((prev) => ({
                  ...(prev ?? emptyForecast),
                  repeat_daily: e.target.checked,
                }))
              }
            />
          }
          label="Repeat Daily"
        />
        <TextField
          label="Daily Time"
          fullWidth
          value={currentForecast?.daily_time ?? ""}
          onChange={(e) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              daily_time: e.target.value,
            }))
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={currentForecast?.repeat_hourly ?? false}
              onChange={(e) =>
                setCurrentForecast((prev) => ({
                  ...(prev ?? emptyForecast),
                  repeat_hourly: e.target.checked,
                }))
              }
            />
          }
          label="Repeat Hourly"
        />
        <TextField
          label="Hourly Minute"
          type="number"
          fullWidth
          value={currentForecast?.hourly_minute ?? ""}
          onChange={(e) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              hourly_minute: +e.target.value,
            }))
          }
        />
      </EditDialog>
    </>
  );
};

export default WindFarmForecasts;
