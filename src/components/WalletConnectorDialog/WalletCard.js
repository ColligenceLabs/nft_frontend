import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';

const WalletCard = ({ wallet, handleWalletCardClick }) => {
  const theme = useTheme();
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
            // border: `1px solid ${
            //   selectedNetwork === network.id ? theme.palette.primary.main : 'white'
            // }`,

            backgroundColor: `${theme.palette.background.paper}`,
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
            backgroundColor: `${theme.palette.background.paper}`,
            borderRadius: '5px',
            height: '55px',
          }}
        />
      )}
    </>
  );
};

export default WalletCard;
