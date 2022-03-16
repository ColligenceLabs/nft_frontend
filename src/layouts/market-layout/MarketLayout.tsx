import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Topbar } from './components';

import { useSelector } from 'react-redux';
import Container from './components/Container';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
  bgcolor?: string;
}

interface Props {
  children: React.ReactNode;
  [x: string]: any;
}

const MarketLayout = ({ children, bgcolor = 'transparent' }: Props): JSX.Element => {
  const customizer = useSelector((state: any) => state.CustomizerReducer);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar />
        </Container>
      </AppBar>

      <main>{children}</main>
      <Container paddingY={4}>{/*<Footer />*/}</Container>
    </Box>
  );
};

export default MarketLayout;
