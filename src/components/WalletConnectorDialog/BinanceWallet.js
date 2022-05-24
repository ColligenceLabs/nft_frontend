import React from 'react';
import { Box, Grid } from '@mui/material';
import metamask_icon from '../../assets/images/wallet_icons/wallet_icon_metamask.png';
import WalletCard from './WalletCard';

const BinanceWalletList = [
  {
    id: 0,
    name: 'metamask',
    value: 'Metamask',
    icon: metamask_icon,
  },
];

const BinanceWallet = ({ klaytn }) => {
  const handleWalletCardClick = async (wallet) => {
    console.log(wallet);
  };

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
