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
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  FormGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import type { WindFarmFormData } from "../../entities/WindFarm/WindFarm";
import Grid from "@mui/material/Grid";
import { useReferences } from "../../shared/contexts/ReferencesContext";

interface Props {
  windFarm: WindFarmFormData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: WindFarmFormData) => void;
}

const steps = ["Create a new wind farm", "Create a new forecast model"];

const TIME_RESOLUTIONS = [
  { label: "Minute", value: "minute" },
  { label: "Hour", value: "hour" },
  { label: "Day", value: "day" },
];

const WindFarmForm: React.FC<Props> = ({ windFarm, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);

  const { turbines: turbinesModels } = useReferences();

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
                      <FormControl fullWidth error={!!fieldState.error}>
                        <InputLabel id={`model-label-${index}`}>
                          Model
                        </InputLabel>
                        <Select
                          labelId={`model-label-${index}`}
                          {...field}
                          value={field.value || ""}
                          label="Model"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        >
                          <MenuItem value="">
                            <em>Select model</em>
                          </MenuItem>
                          {turbinesModels?.map((model) => (
                            <MenuItem key={model.id} value={model.id}>
                              {model.turbine_type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

            {/* Кнопка добавления */}
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

            <Controller
              name="forecast.time_resolution"
              control={control}
              rules={{ required: "Time resolution is required" }}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                >
                  <InputLabel>Time resolution</InputLabel>
                  <Select
                    {...field}
                    label="Time resolution"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>Select resolution</em>
                    </MenuItem>
                    {TIME_RESOLUTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="forecast.repeat_daily"
              control={control}
              render={({ field }) => (
                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Repeat Daily"
                  />
                </FormGroup>
              )}
            />

            <Controller
              name="forecast.repeat_hourly"
              control={control}
              render={({ field }) => (
                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Repeat Hourly"
                  />
                </FormGroup>
              )}
            />

            <Controller
              name="forecast.hourly_minute"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Hourly Minute"
                  type="number"
                  fullWidth
                  margin="normal"
                  InputProps={{ inputProps: { min: 0, max: 59 } }}
                />
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
