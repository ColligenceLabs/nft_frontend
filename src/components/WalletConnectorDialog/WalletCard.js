import React from 'react';
import { Box, Typography } from '@mui/material';

const WalletCard = ({ wallet, handleWalletCardClick }) => {
  return (
    <>
      {wallet.name !== null ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '8px',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '5px',
            gap: '0.5rem',
            cursor: 'pointer',
            height: '55px',
          }}
          onClick={() => handleWalletCardClick(wallet)}
        >
          <img src={wallet.icon} alt="metamask" width="16px" />
          <Typography variant="subtitle2">{wallet.value}</Typography>
        </Box>
      ) : (
        <Box
          style={{
            margin: '8px',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '5px',
            height: '55px',
          }}
        />
      )}
    </>
  );
};

export default WalletCard;
