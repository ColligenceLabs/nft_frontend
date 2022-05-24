import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import metamask_icon from '../../assets/images/wallet_icons/wallet_icon_metamask.png';
import WalletCard from './WalletCard';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { injected, kaikas, walletconnect } from '../../connectors';
import { setActivatingConnector } from '../../redux/slices/wallet';
import { setKlaytn } from '../../redux/slices/wallets';
import { loginWithAddress } from '../../redux/slices/auth';

const BinanceWalletList = [
  {
    id: 0,
    name: 'metamask',
    value: 'Metamask',
    icon: metamask_icon,
  },
];

const BinanceWallet = ({ klaytn }) => {
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, account, chainId } = context;

  const { user } = useSelector((state) => state.auth);

  const handleWalletCardClick = async (wallet) => {
    console.log(wallet);
  };

  useEffect(() => {
    if (account !== undefined) {
      if (user?.infor?.level !== 'administrator') {
        dispatch(loginWithAddress({ address: account, chainId }));
      }
      // dispatch(loginWithAddress({ address: account, chainId }));
    }
  }, [account]);
  return (
    <Box style={{ backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
      <Grid container>
        {BinanceWalletList.map((wallet) => (
          <Grid key={wallet.id} item lg={6} md={6} sm={12} xs={12}>
            <WalletCard
              wallet={wallet}
              network={klaytn}
              handleWalletCardClick={handleWalletCardClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BinanceWallet;
