import React from 'react';
import { Box, experimentalStyled } from '@mui/material';
import eth_icon from '../../assets/images/network_icon/ethereum-eth-logo.png';
import klay_icon from '../../assets/images/network_icon/klaytn-klay-logo.png';
import sol_icon from '../../assets/images/network_icon/solana-sol-logo.png';
import { styled } from '@mui/material/styles';

const WalletIconWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledWalletIcon = experimentalStyled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'gray',
  margin: '5px',
  padding: '5px',
  borderRadius: '100px',
}));

const WalletConnector = () => {
  return (
    <WalletIconWrapper>
      <StyledWalletIcon>
        <img src={eth_icon} alt={'eth_icon'} width="20px" />
      </StyledWalletIcon>
      <StyledWalletIcon>
        <img src={klay_icon} alt={'klay_icon'} width="20px" />
      </StyledWalletIcon>
      <StyledWalletIcon>
        <img src={sol_icon} alt={'sol_icon'} width="20px" />
      </StyledWalletIcon>
    </WalletIconWrapper>
  );
};

export default WalletConnector;
