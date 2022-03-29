import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import eth_icon from '../../assets/images/network_icon/ethereum-eth-logo.png';
import klay_icon from '../../assets/images/network_icon/klaytn-klay-logo.png';
import sol_icon from '../../assets/images/network_icon/solana-sol-logo.png';
import { useTheme } from '@mui/styles';

const NetworkList = [
  {
    id: 0,
    network: 'ethereum',
    network_name: 'Ethereum',
    icon: eth_icon,
  },
  {
    id: 1,
    network: 'klaytn',
    network_name: 'Klaytn',
    icon: klay_icon,
  },
  {
    id: 2,
    network: 'solana',
    network_name: 'Solana',
    icon: sol_icon,
  },
];

const NetworkTab = ({ selectedNetwork, changeNetwork, connectedNetwork }) => {
  const theme = useTheme();

  return (
    <Box style={{ backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
      <Grid container>
        {NetworkList.map((network) => (
          <Grid item key={network.id} lg={4} md={4} sm={12} xs={12}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: '8px',
                padding: '16px',
                border: `1px solid ${
                  selectedNetwork === network.id ? theme.palette.primary.main : 'white'
                }`,

                backgroundColor: `${
                  connectedNetwork.includes(network.network)
                    ? `${theme.palette.thirdary.main}`
                    : `${theme.palette.background.paper}`
                }`,

                borderRadius: '5px',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
              onClick={() => changeNetwork(network.id)}
            >
              <img src={network.icon} alt={network.name} width="16px" />
              <Typography variant="subtitle2"> {network.network_name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NetworkTab;