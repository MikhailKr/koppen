import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { useState, type FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  onDelete: () => void;
};

export const DeleteFarmButton: FC<Props> = ({ onDelete }) => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setConfirmOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={isConfirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete farm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={onDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
