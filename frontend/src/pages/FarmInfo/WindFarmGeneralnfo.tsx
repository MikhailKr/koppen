import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { WindFarmDb } from "../../shared/api/api";
import { useCRUDForWindFarm } from "../../entities/WindFarm/useCRUDForWindFarm";
import EditDialog from "../../shared/widgets/EditDialog/EditDialog";

type Props = {
  windFarm: WindFarmDb;
};

export const WindFarmGeneralnfo: React.FC<Props> = ({ windFarm }) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(windFarm.name);
  const [description, setDescription] = useState(windFarm.description);
  const [latitude, setLatitude] = useState(windFarm.location.latitude);
  const [longitude, setLongitude] = useState(windFarm.location.longitude);

  const { editWindFarm, isLoading } = useCRUDForWindFarm();

  const handleSave = async () => {
    await editWindFarm(windFarm.id, {
      name,
      description,
      location: {
        latitude,
        longitude,
      },
    });
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Main Information</Typography>
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography>
            <strong>Name:</strong> {windFarm.name}
          </Typography>
          <Typography>
            <strong>Description:</strong> {windFarm.description}
          </Typography>
          <Typography>
            <strong>Coordinates:</strong> {windFarm.location.latitude},{" "}
            {windFarm.location.longitude}
          </Typography>
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
