import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import PageContainer from '../../components/container/PageContainer';
import NFTs from './components/NFTs';
import AirDrops from './components/AirDrops';
import Creators from './components/Creators';
import Transactions from './components/Transactions';
import TotalNFTs from './components/TotalNFTs';
import Last30days from './components/Last30days';

const Dashboard = () => (
  <PageContainer title="Dashboard" description="this is Dashboard PAGE">
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <NFTs />
      </Grid>
      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <AirDrops />
      </Grid>
      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <Creators />
      </Grid>
      <Grid item xs={12} sm={6} lg={3} xl={3}>
        <Transactions />
      </Grid>

      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={8}>
        <Last30days />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TotalNFTs />
      </Grid>
    </Grid>
  </PageContainer>
);
export default Dashboard;
