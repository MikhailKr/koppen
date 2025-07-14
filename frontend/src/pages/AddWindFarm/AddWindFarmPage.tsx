import { useEffect, useState, type FC } from "react";
import WindFarmForm from "../../features/WindFarmForm/WindFarmForm";
import { Backdrop, CircularProgress, Snackbar, Alert } from "@mui/material";
import type { WindFarmFormData } from "../../entities/WindFarm/WindFarm";
import { useCreateFarm } from "../../entities/WindFarm/useCreateFarm";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../app/appRoutes";
import { StyledPaper } from "./AddWindFarmPage.styles";

const newWindFarm: WindFarmFormData = {
  id: `new`,
  name: ``,
  latitude: 0,
  longitude: 0,
  turbines: [],
  forecast: {
    name: "",
    recipient: "",
    horizon: "24 hours",
    start_time: new Date(),
    forecast_frequency: "daily",
  },
};

export const AddWindFarmPage: FC = () => {
  const { isLoading, error, createWindFarm } = useCreateFarm();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleFormSubmit = async (data: WindFarmFormData) => {
    const result = await createWindFarm(data);

    if (result.isSuccess) {
      setSnackbar({
        open: true,
        message: "Wind farm successfully created",
        severity: "success",
      });

      setTimeout(() => {
        navigate(appRoutes.projects);
      }, 2000);
    }
  };

  useEffect(() => {
    if (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  }, [error]);

  return (
    <>
      <StyledPaper elevation={3}>
        <WindFarmForm windFarm={newWindFarm} onSubmit={handleFormSubmit} />
      </StyledPaper>

      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
