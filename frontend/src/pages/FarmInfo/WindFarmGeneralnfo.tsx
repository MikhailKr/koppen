import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { WindFarmDb } from "../../shared/api/api";
import { useCRUDForWindFarm } from "../../entities/WindFarm/useCRUDForWindFarm";
import EditDialog from "../../shared/widgets/EditDialog/EditDialog";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../app/appRoutes";
import { DeleteFarmButton } from "./DeleteFarmButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  windFarm: WindFarmDb;
  onUpdate: () => Promise<void>;
};

export const WindFarmGeneralnfo: React.FC<Props> = ({ windFarm, onUpdate }) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(windFarm.name);
  const [description, setDescription] = useState(windFarm.description);
  const [latitude, setLatitude] = useState(windFarm.location.latitude);
  const [longitude, setLongitude] = useState(windFarm.location.longitude);
  const navigate = useNavigate();

  const { editWindFarm, deleteWindFarm, isLoading } = useCRUDForWindFarm();

  const handleDelete = async () => {
    const res = await deleteWindFarm(windFarm.id);

    if (res) {
      navigate(appRoutes.projects);
    }
  };

  const handleSave = async () => {
    await editWindFarm(windFarm.id, {
      name,
      description,
      location: {
        latitude,
        longitude,
      },
    });
    await onUpdate();
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <IconButton onClick={() => navigate(appRoutes.projects)} size="large">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{windFarm.name}</Typography>
      </Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box>
              <Typography>
                <strong>Description:</strong> {windFarm.description}
              </Typography>
              <Typography>
                <strong>Coordinates:</strong> {windFarm.location.latitude},{" "}
                {windFarm.location.longitude}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={() => setOpen(true)}>
                <EditIcon />
              </IconButton>
              <DeleteFarmButton onDelete={handleDelete} />
            </Box>
          </Grid>
        </CardContent>
      </Card>

      <EditDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
        isLoading={isLoading}
        title={"Edit wind farm info"}
        submitLabel={"Save"}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          label="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(Number(e.target.value))}
          fullWidth
          type="number"
        />
        <TextField
          label="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(Number(e.target.value))}
          fullWidth
          type="number"
        />
      </EditDialog>
    </>
  );
};
