import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  submitLabel?: string;
};

const EditDialog: React.FC<Props> = ({
  open,
  title,
  onClose,
  onSubmit,
  isLoading,
  children,
  submitLabel = "Save",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        dividers
        sx={{
          maxHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" disabled={isLoading}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
