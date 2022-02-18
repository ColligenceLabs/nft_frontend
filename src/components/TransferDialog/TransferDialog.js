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
import { useWeb3React } from '@web3-react/core';
import { useKipContract, useKipContractWithKaikas } from '../../hooks/useContract';
import useNFT from '../../hooks/useNFT';
import contracts from '../../config/constants/contracts';
import { batchRegisterNFT, kasTransferNFT } from '../../services/nft.service';
import { LoadingButton } from '@mui/lab';

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

  const { account } = useWeb3React();

  const [contractAddr, setContractAddr] = useState(contracts.kip17[1001]);
  const [contractType, setContractType] = useState('KIP17');
  const kipContract = useKipContract(contractAddr, contractType);
  const kipKaikasContract = useKipContractWithKaikas(contractAddr, contractType);
  const { transferNFT, transferNFTWithKaikas, isTransfering } = useNFT(kipContract, kipKaikasContract, account);

  const [errorMessage, setErrorMessage] = useState();
  const [successFlag, setSuccessFlag] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState(1);
  const [maxAmount, setMaxAmount] = useState(0);

  useEffect(() => {
    if (item !== undefined) {
      console.log(isTransfering);
      if (item && item.collection_id) {
        setContractAddr(item.collection_id.contract_address);
        setContractType(type);
        setMaxAmount(item.quantity_selling - item.transfered);
      }
    }
    return () => setMaxAmount(0);
  }, [item, isTransfering]);

  const handleChangeToAddress = (e) => {
    setToAddress(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value > maxAmount ? maxAmount : e.target.value);
  };

  const handleTransfer = async () => {
    // toAddress, amount
    const tokenId = item.metadata.tokenId;
    const nftId = item._id;
    const useKAS = process.env.REACT_APP_USE_KAS ?? 'false';

    console.log('====>', kipContract);
    if (useKAS === 'true') {
      const formData = {
        nft_id: nftId,
        from_address: account,
        to_address: toAddress,
        tokenId,
        amount,
      };
      console.log('====>', formData);
      // TODO : isTransfering 사용하여 Send 버튼 로딩 표시...
      await kasTransferNFT(formData)
        .then(async (res) => {
          if (res.data.status === 1) {
            setErrorMessage(null);
            setSuccessFlag(true);
          } else {
            setErrorMessage(res.data.message.error._message);
            setSuccessFlag(false);
          }
        })
        .catch((error) => {
          setSuccessFlag(false);
          setErrorMessage(error);
        });
    } else {
      console.log('1 ====>', tokenId, toAddress, amount, nftId, contractType);
      if (window.localStorage.getItem('wallet') === 'kaikas') {
        const [success, error] = await transferNFTWithKaikas(tokenId, toAddress, amount, nftId, contractType);
        console.log('2 ====>', success, error);

        // api finish =>  success ? setSuccessFlag(true), setErrorMessage(null) : setSuccessFlag(false),  setErrorMessage(error.message)
        success ? setSuccessFlag(true) : setSuccessFlag(false);
        success ? setErrorMessage(null) : setErrorMessage(error);
      } else {
        const [success, error] = await transferNFT(tokenId, toAddress, amount, nftId, contractType);
        console.log('2 ====>', success, error);

        // api finish =>  success ? setSuccessFlag(true), setErrorMessage(null) : setSuccessFlag(false),  setErrorMessage(error.message)
        success ? setSuccessFlag(true) : setSuccessFlag(false);
        success ? setErrorMessage(null) : setErrorMessage(error);
      }
    }
    setOpenSnackbar(true);
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
                  {t('Balance')} : {maxAmount}
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
            {t('Cancel')}
          </Button>
          <LoadingButton onClick={handleTransfer} loading={isTransfering} variant="contained">
            {t('Send')}
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

export default TransferDialog;
