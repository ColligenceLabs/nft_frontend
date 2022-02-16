import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const DeleteDialog = ({ title, open, handleDeleteClose, doDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleDeleteClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">삭제 하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose}>Cancel</Button>
        <Button onClick={doDelete}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
