import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import FeatherIcon from 'feather-icons-react';
import { useTranslation } from 'react-i18next';

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Chip,
  Avatar,
  Button,
  Drawer,
  SvgIcon,
  MenuItem,
  ListItemIcon,
  Icon,
  ListItemText,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PropTypes from 'prop-types';
import ProfileDropdown from './ProfileDropdown';
import userimg from '../../../assets/images/users/user2.jpg';
import LanguageSelector from '../../../components/LanguageSelector/LanguageSelector';
import ThemeSelector from '../../../components/ThemeSelector/ThemeSelector';
import WalletDialog from '../../../components/WalletDialog';
import WalletInfo from '../../../components/WalletInfo';
import { useSelector } from 'react-redux';

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const { t } = useTranslation();
  const context = useWeb3React();
  const { connector, library, activate, account } = context;
  const { activatingConnector, balance, talBalance } = useSelector((state) => state.wallet);

  const handleCloseModal = async (name) => {
    setIsOpenConnectModal(false);
  };

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
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
        <LanguageSelector />
        <ThemeSelector />

        {connector ? (
          <>
            <IconButton>
              <AccountBalanceWalletIcon color="primary" />
            </IconButton>
            {!!library && (
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
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src={userimg}
              alt={userimg}
              sx={{
                width: '30px',
                height: '30px',
              }}
            />
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                alignItems: 'center',
              }}
            >
              <Typography color="textSecondary" variant="h5" fontWeight="400" sx={{ ml: 1 }}>
                Hi,
              </Typography>
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{
                  ml: 1,
                }}
              >
                Julia
              </Typography>
              <FeatherIcon icon="chevron-down" width="20" height="20" />
            </Box>
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          sx={{
            '& .MuiMenu-paper': {
              width: '385px',
              right: 0,
              top: '70px !important',
            },
            '& .MuiList-padding': {
              p: '30px',
            },
          }}
        >
          <Box
            sx={{
              mb: 1,
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="500">
                User Profile
              </Typography>
            </Box>
          </Box>

          <ProfileDropdown />
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="/auth/login"
          >
            <Button
              sx={{
                mt: 2,
                display: 'block',
                width: '100%',
              }}
              variant="contained"
              color="primary"
            >
              Logout
            </Button>
          </Link>
        </Menu>
      </Toolbar>
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
