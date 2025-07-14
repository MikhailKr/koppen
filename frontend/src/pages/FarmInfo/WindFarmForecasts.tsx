import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { ForecastDb } from "../../shared/api/api";
import EditDialog from "../../shared/widgets/EditDialog/EditDialog";
import { useCreateOrDeleteForecast } from "../../entities/WindFarm/useCreateOrDeleteForecast";
import { ForecastHorizonToggle } from "../../shared/widgets/ForecastProps/ForecastHorizionToggle";
import { ForecastDeliveryFrequencyPicker } from "../../shared/widgets/ForecastProps/ForecastDeliveryFrequencyPicker";
import type { WindFarmForecast } from "../../entities/WindFarm/WindFarm";
import { generatePath, useNavigate } from "react-router-dom";
import { appRoutes } from "../../app/appRoutes";
import { ForecastDeliveryTimePicker } from "../../shared/widgets/ForecastProps/ForecastDeliveryTimePicker";

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

  const navigate = useNavigate();

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
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Forecasts</Typography>
        <Tooltip title="Add Forecast">
          <IconButton onClick={openCreate}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Card>
        <CardContent>
          <List>
            {forecasts.map((forecast, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  onClick={() =>
                    navigate(
                      generatePath(appRoutes.forecast, {
                        farmId: windFarmId,
                        forecastId: "pepe",
                      }),
                    )
                  }
                >
                  <ListItemText
                    primary={`${forecast.name} (${forecast.horizon})`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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
        <ForecastDeliveryTimePicker
          value={currentForecast?.start_time}
          onChange={(newValue) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              start_time: newValue ?? new Date(),
            }))
          }
        />
        <TextField
          label="Forecast recipient"
          type="email"
          value={currentForecast?.recipient}
          onChange={(e) =>
            setCurrentForecast((prev) => ({
              ...(prev ?? emptyForecast),
              recipient: e.target.value,
            }))
          }
        />
      </EditDialog>
    </>
  );
};

export default WindFarmForecasts;
