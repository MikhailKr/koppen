import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { FC } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: Date | null) => void;
  value?: Date | null;
};

export const ForecastDeliveryTimePicker: FC<Props> = ({ onChange, value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        ampm={false}
        value={value}
        label="First delivery time"
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};
