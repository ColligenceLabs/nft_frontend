import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Snackbar,
  Typography,
} from '@mui/material';
import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';
import CustomTextField from '../forms/custom-elements/CustomTextField';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const MintDialog = ({ open, handleCloseMintModal, item }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();

  const [amount, setAmount] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const mintNft = () => {
    setIsMintLoading(true);

    console.log(item);
    console.log(`amount : ${amount}`);

    // TODO : function mint(uint256 _id, address _to, uint256 _value)
    console.log(item.collection_id.contract_address, item.metadata.tokenId, account, amount);

    let result = 'success';
    if (result === 'success') setSuccessFlag(true);
    else setErrorMessage('error');

    setIsMintLoading(false);
  };

  const handleClose = () => {
    setAmount(1);
    handleCloseMintModal();
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ background: `${theme.palette.primary.main}` }}>
          <Typography variant="title" color="white">
            {`Mint - ${item?.metadata?.name}`}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <CustomFormLabel htmlFor="amount">{t('Amount')}</CustomFormLabel>

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
        </DialogContent>

        <Divider />
        <DialogActions style={{ marginRight: '20px', padding: '10px' }}>
          <Button variant="outlined" onClick={handleClose}>
            {t('Cancel')}
          </Button>
          <LoadingButton onClick={mintNft} loading={isMintLoading} variant="contained">
            {t('Mint')}
          </LoadingButton>
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

export default MintDialog;
