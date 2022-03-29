import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Topbar } from './components';
import { useSelector } from 'react-redux';
import Container from './components/Container';
import MarketSidebar from './sidebar/MarketSidebar';
import Footer from './components/Footer';

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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
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
          boxShadow: 8,
        }}
        elevation={trigger ? 1 : 0}
      >
        <MarketSidebar isSidebarOpen={isSidebarOpen} onSidebarClose={() => setSidebarOpen(false)} />
        <Container paddingY={1}>
          <Topbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        </Container>
      </AppBar>

      <main>{children}</main>
      {/*<Container paddingY={4}>*/}
      {/*<Footer />*/}
      {/*</Container>*/}
    </Box>
  );
};

export default MarketLayout;
