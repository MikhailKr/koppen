import {
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import type { HorizonEnum } from "../../../entities/WindFarm/WindFarm";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: HorizonEnum) => void;
  value?: string;
  isError?: boolean;
};

const HORIZON_OPTIONS = [
  { label: "3", value: "3 hours" },
  { label: "24", value: "24 hours" },
  { label: "48", value: "48 hours" },
  { label: "120", value: "120 hours" },
];

export const ForecastHorizonToggle: FC<Props> = ({
  onChange,
  value,
  isError,
}) => {
  return (
    <FormControl fullWidth error={isError}>
      <Typography variant="body1" gutterBottom>
        Horizon, h
      </Typography>

      <ToggleButtonGroup
        size="large"
        exclusive
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
      >
        {HORIZON_OPTIONS.map((option) => {
          return (
            <ToggleButton key={option.value} value={option.value}>
              {option.label}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </FormControl>
  );
};
