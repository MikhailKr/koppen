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
import type { WindTurbineFleetDb } from "../../shared/api/api";
import EditDialog from "../../shared/widgets/EditDialog/EditDialog";
// import { WindTurbineFleetDb } from "../types";
// import { useEditEntity } from "../hooks/useEditEntity";

type Props = {
  fleets: WindTurbineFleetDb[];
};

const emptyFleet: WindTurbineFleetDb = {
  id: 0,
  number_of_turbines: 0,
  wind_turbine: null,
};

const WindFarmTurbines: React.FC<Props> = ({ fleets }) => {
  const [open, setOpen] = useState(false);
  const [currentFleet, setCurrentFleet] = useState<WindTurbineFleetDb | null>(
    null,
  );
  const isEdit = currentFleet !== null;
  // const { edit, isLoading } = useEditEntity<WindTurbineFleetDb>("WindTurbineFleet");

  const openEdit = (fleet: WindTurbineFleetDb) => {
    setCurrentFleet(fleet);
    setOpen(true);
  };

  const openCreate = () => {
    setCurrentFleet(null);
    setOpen(true);
  };

  const handleSave = () => {
    // const data = currentFleet ?? emptyFleet;
    // edit(data);
    setOpen(false);
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
              sx={{ mb: 2, p: 1, border: "1px solid #eee", borderRadius: 1 }}
            >
              <Box>
                <Typography>
                  Number of Turbines: {fleet.number_of_turbines}
                </Typography>
                <Typography>
                  Type: {fleet.wind_turbine?.turbine_type ?? "-"}
                </Typography>
              </Box>
              <IconButton onClick={() => openEdit(fleet)}>
                <EditIcon />
              </IconButton>
            </Grid>
          ))}
        </CardContent>
      </Card>

      <EditDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
        isLoading={false}
        title={isEdit ? "Edit Turbine Fleet" : "Add Turbine Fleet"}
        submitLabel={isEdit ? "Save" : "Add"}
      >
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
