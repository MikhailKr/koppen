import React from "react";
import { Typography, Box } from "@mui/material";
import { WindFarmTable } from "../../shared/widgets/WindFarmTable/WindFarmTable";

const MainPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        All available farms
      </Typography>

      <WindFarmTable />
    </Box>
  );
};

export default MainPage;
