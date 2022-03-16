import React from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import NFTsList from './components/NFTsList/NFTsList';
import { Box, useTheme } from '@mui/material';

const NFTsMarket = () => {
  const theme = useTheme();
  return (
    <MarketLayout>
      <Container>
        <NFTsList />
      </Container>
    </MarketLayout>
  );
};

export default NFTsMarket;
