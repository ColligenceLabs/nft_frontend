import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Features, Folio, Gallery, Hero, Services } from './components';
import Container from './components/Container';
import MarketLayout from '../../layouts/market-layout/MarketLayout';

const Home = (): JSX.Element => {
  return (
    <MarketLayout colorInvert={true}>
      <Hero />
      <Container>
        <Folio />
      </Container>
      <Box bgcolor={'alternate.main'}>
        <Container>
          <Services />
        </Container>
      </Box>
      <Box bgcolor={'primary.main'}>
        <Container>
          <Features />
        </Container>
      </Box>
      <Container>
        <Gallery />
      </Container>
    </MarketLayout>
  );
};

export default Home;
