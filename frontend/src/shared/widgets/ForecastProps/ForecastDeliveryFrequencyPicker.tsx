import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { FC } from "react";
import type { ForecastFrequencyEnum } from "../../../entities/WindFarm/WindFarm";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: ForecastFrequencyEnum | null) => void;
  value?: ForecastFrequencyEnum | null;
  isError?: boolean;
};

export const ForecastDeliveryFrequencyPicker: FC<Props> = ({
  onChange,
  value,
  isError,
}) => {
  return (
    <FormControl fullWidth error={isError}>
      <InputLabel id="DeliveryFrequency">Delivery frequency</InputLabel>

      <Select
        onChange={(e) => onChange(e.target.value as ForecastFrequencyEnum)}
        labelId="DeliveryFrequency"
        label="Delivery frequency"
        value={value}
      >
        <MenuItem value="" disabled>
          Select frequency
        </MenuItem>
        <MenuItem value="hourly">Every hour</MenuItem>
        <MenuItem value="daily">Every day</MenuItem>
      </Select>
    </FormControl>
  );
};
