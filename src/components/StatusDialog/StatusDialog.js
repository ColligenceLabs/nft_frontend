import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const StatusDialog = ({ open, handleStatusClose, updateStatus }) => {
  return (
    <Dialog
      open={open}
      onClose={handleStatusClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'사용자 활성화'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          사용자를 상태를 변경 하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleStatusClose}>Cancel</Button>
        <Button onClick={updateStatus}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusDialog;
