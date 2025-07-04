import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useReferences } from "../../contexts/ReferencesContext";
import type { FC } from "react";
import type { WindTurbineDb } from "../../api/api";

type Props = {
  value: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (turbine: WindTurbineDb) => void;
  index?: number;
  isError?: boolean;
};

export const WindTurbineSelect: FC<Props> = ({
  onChange,
  index,
  value,
  isError,
}) => {
  const { turbines: turbinesModels } = useReferences();

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel id={`model-label-${index}`}>Model</InputLabel>
      <Select
        labelId={`model-label-${index}`}
        value={value || ""}
        label="Model"
        onChange={(e) => {
          onChange(turbinesModels?.find((x) => x.id === e.target.value)!);
        }}
      >
        <MenuItem value="">
          <em>Select model</em>
        </MenuItem>
        {turbinesModels?.map((model) => (
          <MenuItem key={model.id} value={model.id}>
            {model.turbine_type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
