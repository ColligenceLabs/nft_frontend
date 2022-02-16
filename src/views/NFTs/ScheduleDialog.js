import React from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { deleteNft, deleteNfts, getNFTData, setSchedule } from '../../services/nft.service';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    width: '100px',
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
    background: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },

  walletBoxWrapper: {
    borderRadius: '1rem',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    height: '80px',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  walletBoxIcon: {
    alignItems: 'center',
  },
  walletBoxContent: {
    minWidth: 135,
    padding: '0rem 0.5rem 0rem 0.5rem',
  },

  chipWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1.5rem',
    gap: '0.15rem',
  },
}));

const ScheduleDialog = ({ open, handleCloseModal, selected }) => {
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleChangeStart = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setEndDate(newValue);
  };

  const handleSchedule = async () => {
    const res = await setSchedule(selected, startDate, endDate);
    handleCloseModal();
  };

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          className={classes.dialogTitle}
          id="customized-dialog-title"
          onClose={handleCloseModal}
        >
          <Box className={classes.dialogTitle} id="dialog_title">
            {t('Add Schedule')}
          </Box>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              style={{
                display: 'flex',
                marginTop: '50px',
                marginBottom: '20px',

                justifyContent: 'space-around',
                gap: '0.5rem',
              }}
            >
              <DateTimePicker
                label="Time Start"
                value={startDate}
                onChange={handleChangeStart}
                inputFormat={'yyyy-MM-dd HH:mm'}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="Time End"
                value={endDate}
                onChange={handleChangeEnd}
                inputFormat={'yyyy-MM-dd HH:mm'}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <Divider />
        <DialogActions style={{ marginRight: '20px', padding: '10px' }}>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSchedule}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ScheduleDialog;
