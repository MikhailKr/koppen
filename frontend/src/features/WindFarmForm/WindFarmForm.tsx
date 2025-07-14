import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import type { WindFarmFormData } from "../../entities/WindFarm/WindFarm";
import Grid from "@mui/material/Grid";
import { WindTurbineSelect } from "../../shared/widgets/WindTurbineSelect/WindTurbineSelect";
import { ForecastHorizonToggle } from "../../shared/widgets/ForecastProps/ForecastHorizionToggle";
import { ForecastDeliveryTimePicker } from "../../shared/widgets/ForecastProps/ForecastDeliveryTimePicker";
import { ForecastDeliveryFrequencyPicker } from "../../shared/widgets/ForecastProps/ForecastDeliveryFrequencyPicker";

interface Props {
  windFarm: WindFarmFormData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: WindFarmFormData) => void;
}

const steps = ["Create a new wind farm", "Create a new forecast model"];

const WindFarmForm: React.FC<Props> = ({ windFarm, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);

  const { control, handleSubmit, trigger } = useForm<WindFarmFormData>({
    defaultValues: windFarm,
  });

  const {
    fields: turbines,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "turbines",
  });

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <>
      <Box justifyContent="center" sx={{ display: "flex" }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4, width: "70%" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {activeStep === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Step 1 of 2
            </Typography>

            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description (optional)"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                />
              )}
            />

            <Grid container spacing={2}>
              <Grid size={6}>
                <Controller
                  name="latitude"
                  control={control}
                  rules={{ required: "Latitude is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Latitude"
                      type="number"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="longitude"
                  control={control}
                  rules={{ required: "Longitude is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Longitude"
                      type="number"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {turbines.map((item, index) => (
              <Grid
                container
                spacing={2}
                mt={2}
                key={item.id}
                alignItems="center"
              >
                <Grid size={5}>
                  <Controller
                    name={`turbines.${index}.modelId`}
                    control={control}
                    rules={{ required: "Model is required" }}
                    render={({ field, fieldState }) => (
                      <WindTurbineSelect
                        isError={!!fieldState.error}
                        onChange={(turbine) => field.onChange(turbine.id)}
                        value={field.value}
                        index={index}
                      />
                    )}
                  />
                </Grid>

                <Grid size={5}>
                  <Controller
                    name={`turbines.${index}.number`}
                    control={control}
                    rules={{ required: "Number is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Number"
                        fullWidth
                        type="number"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={2}>
                  <IconButton onClick={() => remove(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button
              onClick={() => append({ modelId: -1, modelName: "", number: 0 })}
              sx={{ mt: 2 }}
            >
              Add Wind Turbine
            </Button>

            <Box mt={4}>
              <Button variant="contained" color="error" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </>
        )}

        {activeStep === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Step 2 of 2
            </Typography>
            <Grid container spacing={4}>
              <Grid size={12}>
                <Controller
                  name="forecast.name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Controller
                  name="forecast.horizon"
                  control={control}
                  defaultValue="3 hours"
                  render={({ field, fieldState }) => (
                    <ForecastHorizonToggle
                      isError={!!fieldState.error}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="forecast.forecast_frequency"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ForecastDeliveryFrequencyPicker
                      isError={!!fieldState.error}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="forecast.start_time"
                  control={control}
                  render={({ field }) => (
                    <ForecastDeliveryTimePicker {...field} />
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Controller
                  name="forecast.recipient"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                      <TextField
                        {...field}
                        placeholder="example@email.com"
                        label="Email address for forecast delivery"
                        type="email"
                        variant="outlined"
                        fullWidth
                      />
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" color="error" type="submit">
                Start Forecasting
              </Button>
            </Box>
          </>
        )}
      </form>
    </>
  );
};

export default WindFarmForm;
