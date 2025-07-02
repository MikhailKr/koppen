import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import type { WindFarmFormData } from "../../entities/WindFarm/WindFarm";
import Grid from "@mui/material/Grid";

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
                    name={`turbines.${index}.model`}
                    control={control}
                    rules={{ required: "Model is required" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Model"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
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
              onClick={() => append({ model: "", number: "" })}
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

            <Controller
              name="forecastName"
              control={control}
              rules={{ required: "Forecast name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Forecast name"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="granularity"
              control={control}
              rules={{ required: "Granularity is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Granularity"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="hourly">Hourly</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="horizon"
              control={control}
              rules={{ required: "Horizon is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Horizon"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="1d">1 day</MenuItem>
                  <MenuItem value="7d">7 days</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="updateFrequency"
              control={control}
              rules={{ required: "Update frequency is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Update frequency"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="hourly">Hourly</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                </TextField>
              )}
            />

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
