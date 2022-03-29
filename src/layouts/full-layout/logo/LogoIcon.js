import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TalkenLogo from '../../../assets/images/logos/talken_logo.png';
import marketLogo from '../../../assets/images/logos/market-logo.svg';
import { Box } from '@mui/material';

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <>
      <Link underline="none" to="/">
        <Box sx={{ padding: 1 }}>
          {customizer.activeMode === 'dark' ? (
            <img src={marketLogo} width="230px" alt="logo" />
          ) : (
            <img src={marketLogo} width="230px" alt="logo" />
          )}
        </Box>
      </Link>
    </>
  );
};

export default LogoIcon;
