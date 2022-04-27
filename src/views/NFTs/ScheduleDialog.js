import React, { useState } from 'react';
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
  TextField,
} from '@mui/material';
import { setSchedule } from '../../services/nft.service';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { LoadingButton } from '@mui/lab';
import useMarket from '../../hooks/useMarket';
import { getSerialsData } from '../../services/serials.service';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { nftDetail } from '../../services/market.service';
import kip17Abi from '../../config/abi/kip17.json';
import kip37Abi from '../../config/abi/kip37.json';
import { ethers } from 'ethers';
import Caver from 'caver-js';

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
  const [endDate, setEndDate] = React.useState(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  );

  const [errorMessage, setErrorMessage] = useState();
  const [successFlag, setSuccessFlag] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { library } = useActiveWeb3React();
  const { sellNFT } = useMarket();
  const useKAS = process.env.REACT_APP_USE_KAS ?? 'false';

  const handleChangeStart = (newValue) => {
    setStartDate(newValue);
  };

  const getNftContract = (contract, type) => {
    const isKaikas =
      library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    if (isKaikas) {
      const caver = new Caver(window.klaytn);
      return new caver.klay.Contract(type === 'KIP17' ? kip17Abi : kip37Abi, contract);
    } else {
      return new ethers.Contract(
        contract,
        type === 'KIP17' ? kip17Abi : kip37Abi,
        library?.getSigner(),
      );
    }
  };

  const handleChangeEnd = (newValue) => {
    setEndDate(newValue);
  };

  const handleSellNFTs = async () => {
    for (let i = 0; i < selected.length; i++) {
      const serials = await getSerialsData(0, 10000, 'active', selected[i]);
      const nftInfo = await nftDetail(selected[i]);
      console.log(nftInfo);

      const nftContract = getNftContract(
        nftInfo.data.collection_id.contract_address,
        nftInfo.data.collection_id.contract_type,
      );
      // for (let j = 0; j < serials.data.items.length; j++) {
      if (serials.data.items[0].owner_id === null) {
        // V3 : function readyToSellToken(address _nft, uint256 _tokenId, uint256 _price, address _quote) external;
        // V4 : function readyToSellToken(address _nft, uint _nftType, uint256 _tokenId, uint256 _quantity, uint256 _price, address _quote) external;
        await sellNFT(
          nftContract,
          nftInfo.data.collection_id.contract_type === 'KIP17' ? 721 : 1155,
          parseInt(serials.data.items[0].token_id, 16),
          nftInfo.data.quantity,
          // TODO : NFT 개당 가격
          nftInfo.data.price,
          nftInfo.data.quote,
        );
        // console.log('readytosell nft',nftContract, parseInt(serials.data.items[j].token_id, 16), nftInfo.data.price);
      }
      // }
    }
  };

  const handleSchedule = async () => {
    if (useKAS !== 'true' && !library) {
      // 지갑 연결 확인 필요.
      alert('지갑을 연결하세요.');
      handleCloseModal();
      return;
    }
    setLoading(true);

    try {
      if (useKAS !== 'true') {
        // 선택된 nft들을 market contract readyToSell 호출
        await handleSellNFTs();
      }

      const res = await setSchedule(selected, startDate, endDate, useKAS);

      if (res.data.status === 1) {
        setErrorMessage(null);
        setSuccessFlag(true);
      } else {
        setSuccessFlag(false);
        setErrorMessage(res.data.message);
      }
    } catch (e) {
      setSuccessFlag(false);
      if (e.data) setErrorMessage(e.data.message);
      else setErrorMessage(e.message);
    }
    setLoading(false);
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
          <LoadingButton loading={loading} variant="contained" onClick={handleSchedule}>
            Confirm
          </LoadingButton>
          {/*<Button variant="contained" onClick={handleSchedule}>*/}
          {/*  Confirm*/}
          {/*</Button>*/}
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

export default ScheduleDialog;
