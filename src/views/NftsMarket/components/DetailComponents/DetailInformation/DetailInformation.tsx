import React, { useState } from 'react';
import { Box, Alert, Snackbar, Typography } from '@mui/material';
import SectionWrapper from '../SectionWrapper';
import useCopyToClipBoard from '../../../../../hooks/useCopyToClipBoard';
import WalletDialog from '../../../../../components/WalletDialog';
import useActiveWeb3React from '../../../../../hooks/useActiveWeb3React';

interface DetailInformationProps {
  contract_address: string;
  description: string;
  createdAt: string;
}
const DetailInformation: React.FC<DetailInformationProps> = ({
  contract_address,
  description,
  createdAt,
}) => {
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const { library, account, activate } = useActiveWeb3React();
  const { copyToClipBoard, copyResult, copyMessage, copyDone, setCopyDone } = useCopyToClipBoard();
  const handleCloseModal = async () => {
    setIsOpenConnectModal(false);
  };
  return (
    <>
      <SectionWrapper title={'Information'} icon={'info'} maxHeight={'200px'}>
        <Box sx={{ p: 2 }}>
          <Typography variant={'subtitle2'} color={'primary'}>
            Contract Address
          </Typography>
          <Typography
            variant={'body2'}
            sx={{ cursor: 'pointer', paddingX: 1 }}
            onClick={() => copyToClipBoard(contract_address)}
          >
            {contract_address}
          </Typography>
          <Typography variant={'subtitle2'} color={'primary'} sx={{ mt: 1 }}>
            Description
          </Typography>
          <Typography variant={'body2'} sx={{ paddingX: 1 }}>
            {description}
          </Typography>
          <Typography variant={'subtitle2'} color={'primary'} sx={{ mt: 1 }}>
            Created at.
          </Typography>
          <Typography variant={'body2'} sx={{ paddingX: 1 }}>
            {new Date(createdAt).toLocaleString()}
          </Typography>
        </Box>
      </SectionWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={copyDone}
        autoHideDuration={2000}
        onClose={() => {
          setCopyDone(false);
        }}
      >
        <Alert variant="filled" severity={copyResult ? 'success' : 'error'} sx={{ width: '100%' }}>
          {copyMessage}
        </Alert>
      </Snackbar>
      <WalletDialog
        isOpenConnectModal={isOpenConnectModal}
        handleCloseModal={handleCloseModal}
        activate={activate}
      />
    </>
  );
};

export default DetailInformation;
