import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoIcon from '../../../full-layout/logo/LogoIcon';
import { IconButton, Typography, useMediaQuery } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ProfileButton from '../../../../components/ProfileButton/ProfileButton';
import { useSelector } from 'react-redux';
import { StoreTypes } from '../../../../views/NftsMarket/types';
import { useTheme } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import WalletConnector from '../../../../components/WalletConnector';
import { useWeb3React } from '@web3-react/core';

const Topbar = ({ toggleSidebar }: any): JSX.Element => {
  // @ts-ignore
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();
  const { user } = useSelector((state: StoreTypes) => state.auth);
  const { pathname } = useLocation();
  const context = useWeb3React();
  const { connector, activate, deactivate, account } = context;

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={1}>
      <LogoIcon />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!smDown ? (
          <>
            <Box
              sx={{
                position: 'relative',
                minWidth: '80px',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="subtitle1"
                  color={pathname === '/' ? 'text.primary' : 'text.secondary'}
                  // fontSize={{ xs: '12px', md: '14px' }}
                  fontWeight={700}
                >
                  Home
                </Typography>
              </Link>
              <Box
                sx={{
                  position: 'absolute',
                  top: '43px',
                  length: '20px',
                  borderBottom: pathname === '/' ? `2px solid ${theme.palette.primary.main}` : '',
                  width: '100%',
                }}
              />
            </Box>
            <Box
              sx={{
                position: 'relative',
                minWidth: '100px',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                mx: '20px',
              }}
            >
              <Link to="/market" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="subtitle1"
                  color={pathname === '/market' ? 'text.primary' : 'text.secondary'}
                  // fontSize={{ xs: '12px', md: '14px' }}
                  fontWeight={700}
                >
                  Marketplace
                </Typography>
              </Link>
              <Box
                sx={{
                  position: 'absolute',
                  top: '43px',
                  length: '20px',
                  borderBottom:
                    pathname === '/market' ? `2px solid ${theme.palette.primary.main}` : '',
                  width: '100%',
                }}
              />
            </Box>
          </>
        ) : (
          <Box>
            <IconButton
              size="large"
              // color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{
                display: {
                  lg: 'none',
                  xs: 'flex',
                },
              }}
            >
              <FeatherIcon icon="menu" width="20" height="20" />
            </IconButton>
          </Box>
        )}
        {/*<Box>*/}
        {/*  <WalletButton />*/}
        {/*</Box>*/}
        <Box>
          <WalletConnector activate={activate} />
        </Box>
        <Box>
          {user === null ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                ml: !smDown ? 2 : 1,
              }}
            >
              {!smDown ? (
                <>
                  <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="subtitle1"
                      color={'text.secondary'}
                      fontWeight={700}
                      sx={[(theme) => ({ '&:hover': { color: theme.palette.primary.main } })]}
                    >
                      Login
                    </Typography>
                  </Link>
                  <Link to="/auth/market-register" style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="subtitle1"
                      color={'text.secondary'}
                      fontWeight={700}
                      sx={[(theme) => ({ '&:hover': { color: theme.palette.primary.main } })]}
                    >
                      Register
                    </Typography>
                  </Link>
                </>
              ) : (
                <Box>
                  <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                    <LoginIcon
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      color={'primary'}
                    />
                  </Link>
                </Box>
              )}
            </Box>
          ) : (
            <ProfileButton useMarket={true} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
