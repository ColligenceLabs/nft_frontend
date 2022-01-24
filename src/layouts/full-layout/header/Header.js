import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getWalletBalance, setActivatingConnector, setBalance } from '../../../redux/slices/wallet';
import { useEagerConnect, useInactiveListener } from '../../../hooks/useWallet';

import { targetNetwork, targetNetworkMsg } from '../../../config';
import { setupNetwork } from '../../../utils/wallet';

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const { t } = useTranslation();

  const { wallet, from } = useSelector((state) => state.nft);
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { connector, library, activate, account } = context;
  const { activatingConnector, balance, talBalance } = useSelector((state) => state.wallet);

  useEffect(() => {
    async function login() {
      // console.log('1----------> ', activatingConnector);
      // console.log('1----------> ', connector);
      // console.log('1----------> ', active);
      // console.log('1----------> ', activate);
      // console.log('os', os);
      // console.log('wallet', wallet);
      // console.log('from', from);
      if (activatingConnector && activatingConnector === connector) {
        dispatch(setActivatingConnector(undefined));
      }
      if (!!library && !!account) {
        if (
          library.provider.chainId !== parseInt(targetNetwork) &&
          library.provider.chainId !== targetNetwork &&
          library.provider.chainId !== undefined
        ) {
          // chainId 가 2 가 아니고 알파월렛이 아니면
          // enqueueSnackbar(targetNetworkMsg, {
          //   variant: 'warning',
          //   autoHideDuration: 3000,
          //   anchorOrigin: {
          //     vertical: 'top',
          //     horizontal: 'center',
          //   },
          // });
          // TODO: 네트워크 전환
          const changeNet = setupNetwork(parseInt(targetNetwork));
        } else {
          dispatch(getWalletBalance(account, library));

          // dispatch(getContractDecimals(account, library));

          // tal 표시 이상해서 제거
          // const taalswap = new Taalswap({
          //   account,
          //   library,
          //   tokenAddress: TAL_TOKEN_ADDRESS
          // });
          //
          // const talBalance = await taalswap
          //   .balanceOf(account)
          //   .catch((error) => console.log(error));
          // dispatch(setTalBalance(talBalance));
        }
      } else if (from !== null) {
        // const taalswap = new Taalswap({ notConnected: true });
        try {
          // const walletBalance = await taalswap.getBalance(wallet);
          const walletBalance = await library.getBalance(account);
          console.log('balance', walletBalance);
          dispatch(setBalance(walletBalance));
        } catch (e) {
          console.log(e);
        }
      } else if (window.klayton) {
        console.log('test=====', window.klayton);
      }
    }
    login();
  }, [activatingConnector, connector, account, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

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
