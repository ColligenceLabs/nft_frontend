import React, { useState } from 'react';
import { experimentalStyled } from '@mui/material';
import WalletConnectorDialog from '../WalletConnectorDialog';
import { useSelector } from 'react-redux';
import WalletDetail from '../WalletDetail/WalletDetail';
import eth_icon from '../../assets/images/network_icon/ethereum-eth-logo.png';
import klay_icon from '../../assets/images/network_icon/klaytn-klay-logo.png';
import sol_icon from '../../assets/images/network_icon/solana-sol-logo.png';

const WalletIconWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  backgroundColor: '#e3e2e2',
  padding: '0px 10px',
}));

const StyledWalletIcon = experimentalStyled('div')(({ cursor_pointer, address, theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  margin: '5px',
  padding: '5px',
  borderRadius: '100px',
  cursor: cursor_pointer === 'true' ? 'pointer' : 'default',
  opacity: `${address !== undefined ? 100 : 0.5}`,
  border: `${address !== undefined ? `1px solid ${theme.palette.primary.main}` : ''}`,
}));

const WalletConnector = ({ activate }) => {
  const { ethereum, klaytn, solana } = useSelector((state) => state.wallets);

  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [selectedNetworkId, setSelectedNetworkId] = useState(0);
  const [connectedWallet, setConnectedWallet] = useState();

  const handleCloseConnectModal = () => {
    setIsOpenConnectModal(false);
  };

  const hanleCloseDetailModal = () => {
    setIsOpenDetailModal(false);
  };

  const handleSwitchWallet = () => {
    setIsOpenDetailModal(false);
    setIsOpenConnectModal(true);
  };
  const onClickWalletIcon = (id, chain, wallet) => {
    setSelectedNetworkId(id);
    if (wallet.address === undefined) {
      setIsOpenConnectModal(true);
    } else {
      setConnectedWallet({ ...wallet, chain: chain });
      setIsOpenDetailModal(true);
    }
  };

  return (
    <>
      <WalletIconWrapper>
        <StyledWalletIcon
          address={ethereum.address}
          // onClick={() => onClickWalletIcon(0, 'ethereum', ethereum)}
          cursor_pointer={'false'}
        >
          <img src={eth_icon} alt={'eth_icon'} width="20px" />
        </StyledWalletIcon>
        <StyledWalletIcon
          address={klaytn.address}
          onClick={() => onClickWalletIcon(1, 'klaytn', klaytn)}
          cursor_pointer={'true'}
        >
          <img src={klay_icon} alt={'klay_icon'} width="20px" />
        </StyledWalletIcon>
        <StyledWalletIcon
          address={solana.address}
          cursor_pointer={'false'}
          // onClick={() => onClickWalletIcon(2, 'solana', solana)}
        >
          <img src={sol_icon} alt={'sol_icon'} width="20px" />
        </StyledWalletIcon>
      </WalletIconWrapper>
      <WalletConnectorDialog
        selectedNetworkId={selectedNetworkId}
        isOpenConnectModal={isOpenConnectModal}
        handleCloseModal={handleCloseConnectModal}
        activate={activate}
        ethereum={ethereum}
        klaytn={klaytn}
        solana={solana}
      />
      <WalletDetail
        isOpenDetailModal={isOpenDetailModal}
        handleCloseDetailModal={hanleCloseDetailModal}
        handleSwitchWallet={handleSwitchWallet}
        connectedWallet={connectedWallet}
      />
    </>
  );
};

export default WalletConnector;
