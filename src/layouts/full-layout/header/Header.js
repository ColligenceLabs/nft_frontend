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
import ProfileDropdown from './ProfileDropdown';
import adminImage from '../../../assets/images/users/admin.png';
import creatorImage from '../../../assets/images/users/creator.png';
import LanguageSelector from '../../../components/LanguageSelector/LanguageSelector';
import ThemeSelector from '../../../components/ThemeSelector/ThemeSelector';
import WalletDialog from '../../../components/WalletDialog';
import WalletInfo from '../../../components/WalletInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletBalance, setActivatingConnector, setBalance } from '../../../redux/slices/wallet';
import { useEagerConnect, useInactiveListener } from '../../../hooks/useWallet';

import { targetNetwork, targetNetworkMsg } from '../../../config';
import { setupNetwork } from '../../../utils/wallet';
import { logout } from '../../../redux/slices/auth';
import { useTheme } from '@mui/styles';
import { updateWallet } from '../../../services/admins.service';
import NetworkSelector from '../../../components/NetworkSelector';
import WalletConnectorDialog from '../../../components/WalletConnectorDialog';
import WalletConnector from '../../../components/WalletConnector';
import { saveAdmin } from '../../../solana/actions/saveAdmin';
import { WhitelistedCreator } from '@colligence/metaplex-common/dist/lib/models/metaplex';

import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection, useMeta } from '@colligence/metaplex-common';

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  // const [isOpenConnectTestModal, setIsOpenConnectTestModal] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = isOpenSnackbar;
  const theme = useTheme();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const { from } = useSelector((state) => state.nft);
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { connector, library, activate, account } = context;
  const { activatingConnector, balance, talBalance } = useSelector((state) => state.wallet);
  const {
    user: {
      infor: { full_name, email, level, image, id },
    },
  } = useSelector((state) => state.auth);

  const [showInitStore, setShowInitStore] = useState(false);
  const wallet = useWallet();
  const { store, isFetching, isLoading } = useMeta();
  const connection = useConnection();

  useEffect(() => {
    if (store === null) {
      if (isLoading) {
        setShowInitStore(true); // Disable
      } else {
        setShowInitStore(false); // Enable
      }
    } else {
      setShowInitStore(true); // Disable
    }
  }, [store, isLoading]);

  let userimg;
  if (image === undefined || image === '') {
    userimg = level.toLowerCase() === 'creator' ? creatorImage : adminImage;
  } else {
    userimg = image.replace(
      'https://nftbedev.talken.io/talkenNft/uploads',
      'http://localhost:4000/talkenNft',
    );
  }

  useEffect(async () => {
    // TODO : Admin 테이블의 admin_address 변경할 지점 - 너무 자주 실행 되는 듯...
    await updateWallet(id, account);
  }, [account]);

  useEffect(() => {
    async function login() {
      if (activatingConnector && activatingConnector === connector) {
        dispatch(setActivatingConnector(undefined));
      }
      if (!!library && !!account) {
        if (
          library.provider.chainId !== parseInt(targetNetwork) &&
          library.provider.chainId !== targetNetwork &&
          library.provider.chainId !== undefined
        ) {
          // chainId가 targetNetwork가 아니고 알파월렛이 아니면

          setIsOpenSnackbar({ open: true, vertical: 'top', horizontal: 'center' });
        } else {
          dispatch(getWalletBalance(account, library));
        }
      } else if (from !== null) {
        // const taalswap = new Taalswap({ notConnected: true });
        try {
          // const walletBalance = await taalswap.getBalance(wallet);
          const walletBalance = await library.getBalance(account);
          dispatch(setBalance(walletBalance));
        } catch (e) {
          console.log(e);
        }
      } else if (window.klaytn) {
      } else {
        // 네트워크 전환
        const changeNet = setupNetwork(parseInt(targetNetwork));
      }
    }
    login();
  }, [activatingConnector, connector, account, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const handleCloseModal = async () => {
    setIsOpenConnectModal(false);
  };

  // const handleCloseTestModal = () => {
  //   setIsOpenConnectTestModal(false);
  // };

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
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
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
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
                {full_name}
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
                {t('User Profile')}
              </Typography>
            </Box>
          </Box>

          <ProfileDropdown fullName={full_name} email={email} level={level} image={image} />
          {level.toLowerCase() === 'administrator' && (
            <Button
              sx={{
                mt: 2,
                display: 'block',
                width: '100%',
              }}
              variant="contained"
              color="primary"
              disabled={showInitStore}
              onClick={async () => {
                console.log('init solana store');
                if (!wallet.publicKey) {
                  return;
                }

                if (wallet.connected && !isLoading && !isFetching && !store) {
                  await saveAdmin(connection, wallet, false, [
                    new WhitelistedCreator({
                      address: wallet.publicKey.toBase58(),
                      activated: true,
                    }),
                  ]);
                } else {
                  console.log('Store already initialized.');
                }
              }}
            >
              {isLoading
                ? t('Wait while Solana Store Loading...')
                : store === null
                ? t('Solana Init Store')
                : t('Solana Store Initialized')}
            </Button>
          )}

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
              onClick={() => {
                dispatch(logout());
              }}
            >
              {t('Logout')}
            </Button>
          </Link>
        </Menu>
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
