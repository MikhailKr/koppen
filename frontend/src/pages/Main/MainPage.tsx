import React from "react";
import { Typography } from "@mui/material";
import { WindFarmTable } from "../../shared/widgets/WindFarmTable/WindFarmTable";
import { PageContainerStyled } from "./MainPage.styles";

const MainPage: React.FC = () => {
  return (
    <PageContainerStyled>
      <Typography variant="h4" gutterBottom>
        My wind farms
      </Typography>

      <WindFarmTable />
    </PageContainerStyled>
  );
};

export default MainPage;
