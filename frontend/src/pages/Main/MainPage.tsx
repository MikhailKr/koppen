import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { WindFarmTable } from "../../shared/widgets/WindFarmTable/WindFarmTable";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../app/appRoutes";
import { PageContainerStyled } from "../../shared/widgets/SharedStyles";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainerStyled>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          My wind farms
        </Typography>
        <Button
          size="small"
          type="button"
          variant="contained"
          sx={{ maxHeight: "40px" }}
          onClick={() => navigate(appRoutes.farmAdd)}
        >
          Add new farm
        </Button>
      </Box>

      <WindFarmTable />
    </PageContainerStyled>
  );
};

export default MainPage;
