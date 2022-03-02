import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import metamask_icon from '../../assets/images/wallet_icons/wallet_icon_metamask.png';
import walletConnect_icon from '../../assets/images/wallet_icons/wallet_icon_walletconnect.png';
import talken_icon from '../../assets/images/wallet_icons/wallet_icon_talk.png';
import kaikas_icon from '../../assets/images/wallet_icons/wallet_icon_kaikas.png';
import WalletCard from './WalletCard';

const KlayWalletList = [
  {
    id: 0,
    name: 'metamask',
    value: 'Metamask',
    icon: metamask_icon,
  },
  {
    id: 1,
    name: 'walletConnector',
    value: 'Wallet Connector',
    icon: walletConnect_icon,
  },
  {
    id: 2,
    name: 'talken',
    value: 'Talken',
    icon: talken_icon,
  },
  {
    id: 3,
    name: 'kaikas',
    value: 'Kaikas',
    icon: kaikas_icon,
  },
];

const KlayWallet = () => {
  const handleWalletCardClick = (wallet) => {
    console.log(wallet);
  };
  return (
    <Box style={{ backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
      <Grid container>
        {KlayWalletList.map((wallet) => (
          <Grid key={wallet.id} item lg={6} md={6} sm={12} xs={12}>
            <WalletCard wallet={wallet} handleWalletCardClick={handleWalletCardClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KlayWallet;
