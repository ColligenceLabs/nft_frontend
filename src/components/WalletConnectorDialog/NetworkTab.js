import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import eth_icon from '../../assets/images/network_icon/ethereum-eth-logo.png';
import klay_icon from '../../assets/images/network_icon/klaytn-klay-logo.png';
import sol_icon from '../../assets/images/network_icon/solana-sol-logo.png';

const NetworkList = [
  {
    id: 0,
    network: 'eth',
    network_name: 'Ethreame',
    icon: eth_icon,
  },
  {
    id: 1,
    network: 'klay',
    network_name: 'Klaytn',
    icon: klay_icon,
  },
  {
    id: 2,
    network: 'sol',
    network_name: 'Solana',
    icon: sol_icon,
  },
];

const NetworkTab = ({ changeNetwork }) => {
  return (
    <Box style={{ backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
      <Grid container>
        {NetworkList.map((network) => (
          <Grid item key={network.id} lg={4} md={4} sm={12}>
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
