import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import marketLogo from '../../../assets/images/logos/market-logo.svg';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const LogoIcon = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <>
      <Link underline="none" to="/">
        <Box sx={{ padding: 1, display: 'flex', alignItems: 'center' }}>
          {customizer.activeMode === 'dark' ? (
            <img src={marketLogo} width={smDown ? '180' : '230px'} alt="logo" />
          ) : (
            <img src={marketLogo} width={smDown ? '180' : '230px'} alt="logo" />
          )}
        </Box>
      </Link>
    </>
  );
};

export default LogoIcon;
