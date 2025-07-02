import React from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";
import { useEditWindFarm } from "../../entities/WindFarm/useEditWindFarm";
import WindFarmForm from "../../features/WindFarmForm/WindFarmForm";

const EditWindFarmPage: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useEditWindFarm(id ?? ``);

  if (!id) {
    return (
      <Typography color="error" variant="h6" align="center" mt={4}>
        Ошибка: не передан id ветрофермы в URL
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography color="error" variant="h6" align="center" mt={4}>
        Farm not found
      </Typography>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 1280, margin: "24px auto", padding: 3 }}
    >
      <WindFarmForm windFarm={data} onSubmit={() => alert("Сохранено")} />
    </Paper>
  );
};

export default EditWindFarmPage;
