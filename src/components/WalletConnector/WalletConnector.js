import React, { useState } from 'react';
import { Box, experimentalStyled } from '@mui/material';
import eth_icon from '../../assets/images/network_icon/ethereum-eth-logo.png';
import klay_icon from '../../assets/images/network_icon/klaytn-klay-logo.png';
import sol_icon from '../../assets/images/network_icon/solana-sol-logo.png';
import { styled } from '@mui/material/styles';
import WalletConnectorDialog from '../WalletConnectorDialog';
import { useSelector } from 'react-redux';

const WalletIconWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  backgroundColor: '#e3e2e2',
  padding: '0px 10px',
}));

const StyledWalletIcon = experimentalStyled('div')(({ address, theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  margin: '5px',
  padding: '5px',
  borderRadius: '100px',
  cursor: 'pointer',
  opacity: `${address !== undefined ? 100 : 0.5}`,
  border: `${address !== undefined ? `1px solid ${theme.palette.primary.main}` : ''}`,
}));

const WalletConnector = ({ activate }) => {
  const { ethereum, klaytn, solana } = useSelector((state) => state.wallets);

  const [isOpenConnectTestModal, setIsOpenConnectTestModal] = useState(false);
  const [selectedNetworkId, setSelectedNetworkId] = useState(0);
  const handleCloseTestModal = () => {
    setIsOpenConnectTestModal(false);
  };
  const onClickWalletIcon = (id) => {
    setSelectedNetworkId(id);
    setIsOpenConnectTestModal(true);
  };

  return (
    <>
      <WalletIconWrapper>
        <StyledWalletIcon address={ethereum.address} onClick={() => onClickWalletIcon(0)}>
          <img src={eth_icon} alt={'eth_icon'} width="20px" />
        </StyledWalletIcon>
        <StyledWalletIcon address={klaytn.address} onClick={() => onClickWalletIcon(1)}>
          <img src={klay_icon} alt={'klay_icon'} width="20px" />
        </StyledWalletIcon>
        <StyledWalletIcon address={solana.address} onClick={() => onClickWalletIcon(2)}>
          <img src={sol_icon} alt={'sol_icon'} width="20px" />
        </StyledWalletIcon>
      </WalletIconWrapper>
      <WalletConnectorDialog
        selectedNetworkId={selectedNetworkId}
        isOpenConnectModal={isOpenConnectTestModal}
        handleCloseModal={handleCloseTestModal}
        activate={activate}
        ethereum={ethereum}
        klaytn={klaytn}
        solana={solana}
      />
    </>
  );
};

export default WalletConnector;
