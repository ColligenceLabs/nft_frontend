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
import useNFT from '../../hooks/useNFT';
import { useKipContract, useKipContractWithKaikas } from '../../hooks/useContract';
import { SUCCESS } from '../../config/constants/consts';
import { getChainId } from '../../utils/commonUtils';
import { targetNetworkMsg } from '../../config';
import { setupNetwork } from '../../utils/wallet';
import { useSelector } from 'react-redux';
import { setMintNFT37 } from '../../services/nft.service';

const MintDialog = ({ open, handleCloseMintModal, item }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { account, chainId } = useWeb3React();
  const { ethereum, klaytn, solana, binance } = useSelector((state) => state.wallets);
  const contractType = 'KIP37';
  const kipContract = useKipContract(item.collection_id?.contract_address, contractType);
  const kasContract = useKipContractWithKaikas(item.collection_id?.contract_address, contractType);
  const { mintNFT37 } = useNFT(
    kipContract,
    kasContract,
    account,
  );
  const [amount, setAmount] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const mintNft = async () => {
    setIsMintLoading(true);
    try {
      const targetNetwork = item.collection_id.network;
      if (
        (targetNetwork === 'binance' && binance.address === undefined) ||
        (targetNetwork === 'klaytn' && klaytn.address === undefined) ||
        (targetNetwork === 'ethereum' && ethereum.address === undefined)
      ) {
        // todo 지갑연결 창을 targetNetowrk 선택 상태로 띄워 준다.
        console.log('지갑을 연결하시오.');
      }
      const targetChainId = getChainId(targetNetwork);
      if (chainId !== targetChainId) {
        if (targetNetwork === 'klaytn' && klaytn.wallet === 'kaikas') {
          setErrorMessage(targetNetworkMsg);
          setIsMintLoading(false);
        } else await setupNetwork(targetChainId);
      }

      const result = await mintNFT37(item.metadata.tokenId, amount, item.ipfs_link, item._id);
      if (result === SUCCESS) {
        const nft = await setMintNFT37(item._id, amount);
        setSuccessFlag(true);
        // 정상종료 모달 창 종료

      }
      else setErrorMessage('error');
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
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
