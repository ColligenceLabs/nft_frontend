import React, { useState } from 'react';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { infuraChainId } from '../config';
import { makeStyles } from '@mui/styles';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Snackbar,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {},
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
    background: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },
  dialogContent: {
    width: '450px',
    marginTop: '1rem',
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
  },
}));

const WalletInfo = ({ walletAddress, balance, disconnect }) => {
  const classes = useStyles();
  const context = useWeb3React();
  const { deactivate } = context;
  const { t } = useTranslation();

  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isOpenCopied, setIsOpenCopied] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = isOpenCopied;

  const onClickCopy = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(walletAddress);
      } else {
        let textArea = document.createElement('textarea');
        textArea.value = walletAddress;
        console.log(textArea.value);
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        new Promise((res, rej) => {
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }

      setIsOpenCopied({ open: true, vertical: 'bottom', horizontal: 'right' });
    } catch (error) {}
  };

  const n = walletAddress.length;
  const walletStr = walletAddress.substr(0, 5) + '...' + walletAddress.substr(n - 5, n);

  const handleCloseAccount = () => {
    setIsOpenAccount(false);
  };

  const handleCopiedClose = () => {
    setIsOpenCopied({ ...isOpenCopied, open: false });
  };
  return (
    <React.Fragment>
      <Button onClick={() => setIsOpenAccount(true)}>{walletStr}</Button>

      <Dialog
        open={isOpenAccount}
        onClose={handleCloseAccount}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          className={classes.dialogTitle}
          id="customized-dialog-title"
          onClose={handleCloseAccount}
        >
          {t('Account')}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3">{walletStr}</Typography>
            <Button
              variant="contained"
              size="small"
              onClick={async () => {
                await deactivate();
                window.localStorage.removeItem('chainId');
              }}
            >
              {t('Disconnect')}
            </Button>
          </Box>

          <Box display="flex" justifyContent="flex-start" gap="0.5rem">
            <Chip label={t('Copy Address')} color="primary" size="small" onClick={onClickCopy} />
            <Chip
              label={t('View On EthScan')}
              color="secondary"
              size="small"
              onClick={() => {
                const url =
                  infuraChainId === 'mainnet'
                    ? `https://etherscan.io/address/${walletAddress}`
                    : `https://${infuraChainId}.etherscan.io/address/${walletAddress}`;
                window.open(url, '_blank');
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={handleCopiedClose}
        message="Copying is complete."
        key={vertical + horizontal}
      />
    </React.Fragment>
  );
};

export default WalletInfo;
