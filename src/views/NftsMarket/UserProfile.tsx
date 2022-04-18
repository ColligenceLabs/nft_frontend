import React, { useEffect, useState } from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from '../../layouts/market-layout/components/Container';
import { Alert, Box, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useUserInfo from '../../hooks/useUserInfo';
import klayLogo from '../../assets/images/network_icon/klaytn-klay-logo.png';
import { Link } from 'react-router-dom';
import useCopyToClipBoard from '../../hooks/useCopyToClipBoard';
import { useWeb3React } from '@web3-react/core';
import splitAddress from '../../utils/splitAddress';
import WalletDialog from '../../components/WalletDialog';
import { getUserNFTs } from '../../services/nft.service';
import NFTItem from './components/NFTItem';

const UserProfile = () => {
  const { image, full_name, description } = useUserInfo();
  const { copyToClipBoard, copyResult, copyMessage, copyDone, setCopyDone } = useCopyToClipBoard();
  const context = useWeb3React();
  const { activate, account } = context;
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const handleCloseModal = async () => {
    setIsOpenConnectModal(false);
  };
  const [myNfts, setMyNfts] = useState([]);

  useEffect(() => {
    const fetchMyNfts = async () => {
      const nfts = await getUserNFTs(account, 100);
      setMyNfts(nfts.data.nfts);
      console.log(nfts);
    };

    fetchMyNfts();
  }, [getUserNFTs, account]);

  return (
    <MarketLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: 1, height: '250px' }}>
          <img
            src={image}
            alt={full_name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '150px',
            height: '150px',
            marginTop: '-75px',
          }}
        >
          <img
            src={image}
            alt={full_name}
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '100%' }}
          />
        </Box>

        <Box
          sx={{
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          >
            <Typography variant={'h1'}>{full_name}</Typography>
            <IconButton component={Link} to="/market/profile/setting">
              <SettingsOutlinedIcon fontSize={'medium'} />
            </IconButton>
          </Box>
          {account !== undefined && account !== null ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid #d6d6d6',
                borderRadius: '50px',
                py: '5px',
                px: '10px',
                my: '10px',
                cursor: 'pointer',
              }}
              onClick={() => copyToClipBoard(account)}
            >
              <img src={klayLogo} alt="klay" height="16px" />
              <Typography variant={'body1'}>{splitAddress(account!)}</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid #d6d6d6',
                borderRadius: '50px',
                py: '5px',
                px: '10px',
                my: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setIsOpenConnectModal(true)}
            >
              <Typography variant={'body1'}>Connect Wallet</Typography>
            </Box>
          )}

          <Typography variant={'body1'}>{description}</Typography>
        </Box>
      </Box>
      <Container>
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: `#d9d9d9`,
            width: '100%',
            py: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant={'h3'} fontWeight={800}>
            My NFTs
          </Typography>
        </Box>
        <Grid container>
          {myNfts !== null && myNfts.length > 0 ? (
            myNfts.map((item, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                <NFTItem item={item} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  border: '1px solid #d6d6d6',
                  borderRadius: '30px',
                  minHeight: '300px',
                }}
              >
                <Typography variant={'h2'}>No items to display</Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        <WalletDialog
          isOpenConnectModal={isOpenConnectModal}
          handleCloseModal={handleCloseModal}
          activate={activate}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={copyDone}
          autoHideDuration={2000}
          onClose={() => {
            setCopyDone(false);
          }}
        >
          <Alert
            variant="filled"
            severity={copyResult ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {copyMessage}
          </Alert>
        </Snackbar>
      </Container>
    </MarketLayout>
  );
};

export default UserProfile;
