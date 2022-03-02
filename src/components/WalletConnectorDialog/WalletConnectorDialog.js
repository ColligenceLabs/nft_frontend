import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NetworkTab from './NetworkTab';
import KlayWallet from './KlayWallet';
import EthWallet from './EthWallet';
import SolWallet from './SolWallet';

const WalletConnectorDialog = ({
  isOpenConnectModal,
  handleCloseModal,
  activate,
  selectedNetworkId,
}) => {
  const { t } = useTranslation();
  const [selectedNetwork, setSelectedNetwork] = useState(selectedNetworkId);

  const changeNetwork = (id) => {
    setSelectedNetwork(id);
  };

  useEffect(() => {
    setSelectedNetwork(selectedNetworkId);
    return () => setSelectedNetwork(0);
  }, [selectedNetworkId]);

  return (
    <React.Fragment>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={isOpenConnectModal}
        onClose={handleCloseModal}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          <Box id="dialog_title">{t('Connect Wallet')}</Box>
        </DialogTitle>
        <DialogContent>
          <NetworkTab selectedNetwork={selectedNetwork} changeNetwork={changeNetwork} />
          <Box style={{ width: '100%', height: '1rem' }} />
          {selectedNetwork === 0 && <EthWallet />}
          {selectedNetwork === 1 && <KlayWallet />}
          {selectedNetwork === 2 && <SolWallet />}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default WalletConnectorDialog;
