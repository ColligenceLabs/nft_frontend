import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Snackbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';
import CustomTextField from '../forms/custom-elements/CustomTextField';

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

const TransferDialog = ({ open, handleCloseModal, item, type }) => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState();
  const [successFlag, setSuccessFlag] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (item !== undefined) {
      console.log(item);
      console.log(item.collection_id?.creator_id);
    }
  }, [item]);

  const handleChangeToAddress = (e) => {
    setToAddress(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleTransfer = () => {
    if (type === 'KIP17') {
      console.log('KIP17 SEND');
    } else {
      console.log('KIP37 SEND');
    }
    // api finish =>  success ? setSuccessFlag(true), setErrorMessage(null) : setSuccessFlag(false),  setErrorMessage(error.message)
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
            {`Transfer ${item.type === 0 ? 'NFT' : 'AirDrop'}`}
          </Box>
        </DialogTitle>
        <DialogContent>
          <CustomFormLabel htmlFor="toAddress">{t('To Address')}</CustomFormLabel>
          <CustomTextField
            id="toAddress"
            name="toAddress"
            variant="outlined"
            fullWidth
            size="small"
            value={toAddress}
            onChange={handleChangeToAddress}
          />
          {type === 'KIP37' && (
            <>
              <Box
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}
              >
                <CustomFormLabel htmlFor="amount">{t('Amount')}</CustomFormLabel>
                <Typography variant="caption" color="primary" sx={{ mr: 1 }}>
                  남은 수량 : {item.quantity_selling - item.transfered}
                </Typography>
              </Box>
              <CustomTextField
                id="amount"
                name="amount"
                type="number"
                variant="outlined"
                fullWidth
                size="small"
                value={amount || ''}
                onChange={handleChangeAmount}
              />
            </>
          )}
        </DialogContent>

        <Divider />
        <DialogActions style={{ marginRight: '20px', padding: '10px' }}>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleTransfer}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={successFlag ? 2000 : 3000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
          }}
          variant="filled"
          severity={successFlag ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {successFlag ? 'Success' : errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default TransferDialog;
