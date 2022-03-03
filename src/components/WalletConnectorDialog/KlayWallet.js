import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import metamask_icon from '../../assets/images/wallet_icons/wallet_icon_metamask.png';
import walletConnect_icon from '../../assets/images/wallet_icons/wallet_icon_walletconnect.png';
import talken_icon from '../../assets/images/wallet_icons/wallet_icon_talk.png';
import kaikas_icon from '../../assets/images/wallet_icons/wallet_icon_kaikas.png';
import WalletCard from './WalletCard';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { injected, kaikas, walletconnect } from '../../connectors';
import { setActivatingConnector } from '../../redux/slices/wallet';
import { setKlaytn } from '../../redux/slices/wallets';

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
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { activate, account } = context;
  const [walletName, setWalletName] = useState('');

  useEffect(() => {
    if (walletName !== '') {
      dispatch(setKlaytn({ wallet: walletName, address: account }));
    }
  }, [walletName, account]);

  const handleWalletCardClick = async (wallet) => {
    console.log(wallet);
    setWalletName(wallet.name);
    if (wallet.name === 'metamask') {
      await activate(injected, null, true);
      dispatch(setActivatingConnector(injected));
    } else if (wallet.name === 'walletConnector') {
      const wc = walletconnect(true);
      await activate(wc, undefined, true);
    } else if (wallet.name === 'kaikas') {
      await activate(kaikas, null, true);
      dispatch(setActivatingConnector(kaikas));
    }
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
