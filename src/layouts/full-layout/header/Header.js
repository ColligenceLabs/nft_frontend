import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Avatar,
  Button,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PropTypes from 'prop-types';
import LanguageSelector from '../../../components/LanguageSelector/LanguageSelector';
import ThemeSelector from '../../../components/ThemeSelector/ThemeSelector';
import WalletDialog from '../../../components/WalletDialog';
import WalletInfo from '../../../components/WalletInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useEagerConnect, useInactiveListener } from '../../../hooks/useWallet';

import { targetNetwork, targetNetworkMsg } from '../../../config';
import { useTheme } from '@mui/styles';
import NetworkSelector from '../../../components/NetworkSelector';
import WalletConnector from '../../../components/WalletConnector';
import ProfileButton from '../../../components/ProfileButton/ProfileButton';

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = isOpenSnackbar;
  const theme = useTheme();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const context = useWeb3React();
  const { connector, library, activate, account } = context;
  const { activatingConnector, balance, talBalance } = useSelector((state) => state.wallet);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const handleCloseModal = async () => {
    setIsOpenConnectModal(false);
  };

  const handleSnackbarClose = () => {
    setIsOpenSnackbar({ ...isOpenSnackbar, open: false });
  };

  return (
    <AppBar sx={sx} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          size="large"
          sx={{
            display: {
              lg: 'flex',
              xs: 'none',
            },
          }}
        >
          <FeatherIcon icon="menu" />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'flex',
            },
          }}
        >
          <FeatherIcon icon="menu" width="20" height="20" />
        </IconButton>
        <Box flexGrow={1} />

        <NetworkSelector />

        {connector ? (
          <>
            <IconButton>
              <AccountBalanceWalletIcon color="primary" />
            </IconButton>
            {!!library && !smDown && (
              <WalletInfo
                walletAddress={account}
                balance={balance}
                talBalance={talBalance}
                disconnect={true}
              />
            )}
          </>
        ) : (
          <IconButton onClick={() => setIsOpenConnectModal(true)}>
            <AccountBalanceWalletIcon />
          </IconButton>
        )}

        <Box
          sx={{
            mr: 1,
          }}
        >
          <WalletConnector activate={activate} />
        </Box>
        <LanguageSelector />
        <ThemeSelector />
        <WalletDialog
          isOpenConnectModal={isOpenConnectModal}
          handleCloseModal={handleCloseModal}
          activate={activate}
        />

        <Box
          sx={{
            width: '1px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: '25px',
            ml: 1,
            mr: 1,
          }}
        />
        {/* Profile Dropdown */}
        <ProfileButton />
      </Toolbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="error"
          style={{
            background: `${theme.palette.error.main}`,
            color: `${theme.palette.error.light}`,
          }}
        >
          {targetNetworkMsg}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
