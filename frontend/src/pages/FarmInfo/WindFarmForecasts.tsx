import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  Tooltip,
  Box,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { ForecastDb } from "../../shared/api/api";
import EditDialog from "../../shared/widgets/EditDialog/EditDialog";
import { useCreateOrDeleteForecast } from "../../entities/WindFarm/useCreateOrDeleteForecast";
import { ForecastHorizonToggle } from "../../shared/widgets/ForecastProps/ForecastHorizionToggle";
import { ForecastDeliveryFrequencyPicker } from "../../shared/widgets/ForecastProps/ForecastDeliveryFrequencyPicker";
import type { WindFarmForecast } from "../../entities/WindFarm/WindFarm";

type Props = {
  onUpdate: () => Promise<void>;
  forecasts: ForecastDb[];
  windFarmId: number;
};

const emptyForecast: WindFarmForecast = {
  name: "",
  horizon: "24 hours",
  enable: true,
  granularity: "60 minutes",
  start_time: new Date(),
  forecast_frequency: "daily",
  recipient: "",
};

const WindFarmForecasts: React.FC<Props> = ({
  windFarmId,
  forecasts,
  onUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [currentForecast, setCurrentForecast] =
    useState<WindFarmForecast | null>(null);
  const { createForecastRequest, isLoading } = useCreateOrDeleteForecast();

  const openCreate = () => {
    setCurrentForecast(null);
    setOpen(true);
  };

  const handleSave = async () => {
    if (currentForecast) {
      await createForecastRequest(windFarmId, currentForecast);
      await onUpdate();
      setOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
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
            >
              <Box>
                <Typography>Name: {forecast.name}</Typography>
                <Typography>Forecast horizon: {forecast.horizon}</Typography>

                <Typography>
                  Recipients: {forecast.recipients.join(",")}
                </Typography>
              </Box>
              {/* <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton> */}
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
          label="Forecast name"
          value={currentForecast?.name}
          onChange={(e) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              name: e.target.value,
            }))
          }
        />
        <ForecastHorizonToggle
          onChange={(newValue) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              horizon: newValue,
            }))
          }
          value={currentForecast?.horizon}
        />
        <ForecastDeliveryFrequencyPicker
          value={currentForecast?.forecast_frequency}
          onChange={(newValue) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              forecast_frequency: newValue ?? "daily",
            }))
          }
        />
      </EditDialog>
    </>
  );
};

export default WindFarmForecasts;
