import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import phantom_icon from '../../assets/images/wallet_icons/wallet-phantom-logo.png';
import WalletCard from './WalletCard';

const SolWalletList = [
  {
    id: 0,
    name: 'phantom',
    value: 'Phantom',
    icon: phantom_icon,
  },
  {
    id: 1,
    name: null,
    value: null,
    icon: null,
  },
  {
    id: 2,
    name: null,
    value: null,
    icon: null,
  },
  {
    id: 3,
    name: null,
    value: null,
    icon: null,
  },
];
const SolWallet = () => {
  const handleWalletCardClick = (wallet) => {
    console.log(wallet);
  };
  return (
    <Box style={{ backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
      <Grid container>
        {SolWalletList.map((wallet) => (
          <Grid key={wallet.id} item lg={6} md={6} sm={12} xs={12}>
            <WalletCard wallet={wallet} handleWalletCardClick={handleWalletCardClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SolWallet;
