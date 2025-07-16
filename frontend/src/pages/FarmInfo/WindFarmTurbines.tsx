import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  TextField,
  Tooltip,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { WindTurbineFleetDb } from "../../shared/api/api";
import EditDialog from "../../shared/widgets/EditDialog/EditDialog";
import { WindTurbineSelect } from "../../shared/widgets/WindTurbineSelect/WindTurbineSelect";
import { useCRUDForTurbine } from "../../entities/WindFarm/useCRUDForTurbine";

type Props = {
  fleets: WindTurbineFleetDb[];
  onUpdate: () => Promise<void>;
};

const emptyFleet: WindTurbineFleetDb = {
  id: 0,
  number_of_turbines: 0,
  wind_turbine: null,
};

const WindFarmTurbines: React.FC<Props> = ({ fleets, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [currentFleet, setCurrentFleet] = useState<WindTurbineFleetDb | null>(
    null,
  );

  const { saveTurbine, deleteTurbine, isLoading } = useCRUDForTurbine();

  const isEdit = currentFleet !== null;

  const openEdit = (fleet: WindTurbineFleetDb) => {
    setCurrentFleet(fleet);
    setOpen(true);
  };

  const openCreate = () => {
    setCurrentFleet(null);
    setOpen(true);
  };

  const handleSave = async () => {
    const data = currentFleet ?? emptyFleet;
    await saveTurbine(data);
    await onUpdate();
    setOpen(false);
  };

  const handleDelete = async (turbineFleetId: number) => {
    await deleteTurbine(turbineFleetId);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Turbines</Typography>
            <Tooltip title="Add Turbine Fleet">
              <IconButton onClick={openCreate}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {fleets.map((fleet) => (
            <Grid
              container
              key={fleet.id}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography>
                  Number of Turbines: {fleet.number_of_turbines}
                </Typography>
                <Typography>
                  Type: {fleet.wind_turbine?.turbine_type ?? "-"}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => openEdit(fleet)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(fleet.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </CardContent>
      </Card>

      <EditDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
        isLoading={isLoading}
        title={isEdit ? "Edit Turbine Fleet" : "Add Turbine Fleet"}
        submitLabel={isEdit ? "Save" : "Add"}
      >
        <WindTurbineSelect
          onChange={(turbine) =>
            setCurrentFleet((prev) => ({
              ...(prev ?? emptyFleet),
              wind_turbine: turbine,
            }))
          }
          value={currentFleet?.wind_turbine?.id ?? -1}
        />
        <TextField
          label="Number of Turbines"
          type="number"
          fullWidth
          value={currentFleet?.number_of_turbines ?? ""}
          onChange={(e) =>
            setCurrentFleet((prev) => ({
              ...(prev ?? emptyFleet),
              number_of_turbines: +e.target.value,
            }))
          }
        />
      </EditDialog>
    </>
  );
};

export default WindFarmTurbines;
