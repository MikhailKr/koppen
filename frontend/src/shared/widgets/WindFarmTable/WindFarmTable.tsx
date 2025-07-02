import {
  TableContainer,
  Paper,
  Box,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { useWindFarmsList } from "../../../entities/WindFarms/useWindFarmsList";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { generatePath, useNavigate } from "react-router-dom";
import { appRoutes } from "../../../app/appRoutes";
import type { FC } from "react";

export const WindFarmTable: FC = () => {
  const navigate = useNavigate();
  const { windFarms, isLoading, isError } = useWindFarmsList();

  const handleViewFarm = (id: string) => {
    navigate(generatePath(appRoutes.farmView, { id }));
  };

  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={4}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {isError && <Typography variant="h3">There was an error :(</Typography>}
      {windFarms && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => navigate(appRoutes.farmAdd)}
                >
                  Add new farm
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {windFarms.map((farm) => (
              <TableRow key={farm.id}>
                <TableCell>{farm.name}</TableCell>
                <TableCell>{farm.description}</TableCell>
                <TableCell>
                  {farm.location.latitude} {farm.location.longitude}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleViewFarm(farm.id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};
