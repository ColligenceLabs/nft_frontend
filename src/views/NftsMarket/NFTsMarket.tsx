import React from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import CollectionList from './components/CollectionList/CollectionList';
import { Box, useTheme, Typography, Divider } from '@mui/material';

const NFTsMarket = () => {
  const theme = useTheme();
  return (
    <MarketLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography variant={'h1'} fontWeight={800}>
          Collections
        </Typography>
      </Box>
      <Divider variant="middle" sx={{ mt: 5 }} />
      <Container style={{ marginTop: '-30px' }}>
        <CollectionList />
      </Container>
    </MarketLayout>
  );
};

export default NFTsMarket;
