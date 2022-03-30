import React from 'react';
import { Box, CardMedia, Grid, Typography } from '@mui/material';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import wallet_icon from '../../../../assets/images/landing_icon/introduction_wallet.svg';
import collection_icon from '../../../../assets/images/landing_icon/introduction_collection.svg';
import nft_icon from '../../../../assets/images/landing_icon/introduction_nft.svg';
import taal_icon from '../../../../assets/images/landing_icon/introduction_taal.svg';
import marketLogo from '../../../../assets/images/logos/market-logo.svg';

const Introduction = () => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  return (
    <Box sx={{ mt: '30px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: smDown ? 'column' : 'row',
          gap: '0.5rem',
          mb: '50px',
        }}
      >
        <Typography fontSize={'30px'} fontWeight={'700'} color={'white'}>
          Create and sell
        </Typography>
        <Typography fontSize={'30px'} fontWeight={'700'} color={'white'}>
          your NFTs
        </Typography>
      </Box>
      <Grid container>
        <Grid
          item
          sm={12}
          md={6}
          lg={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.5rem',
            p: '20px',
          }}
        >
          {/*<AccountBalanceWalletTwoToneIcon sx={{ fontSize: '60px' }} />*/}
          <img src={wallet_icon} width="60px" alt="wallet_icon" />
          <Typography variant={'h3'} color={'text.primary'}>
            Set up your wallet
          </Typography>
          <Typography variant={'h5'} color={'text.primary'}>
            Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet
            icon in the top right corner. Learn about the wallets we support.
          </Typography>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          lg={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.5rem',
            p: '20px',
          }}
        >
          {/*<DashboardTwoToneIcon sx={{ fontSize: '60px' }} />*/}
          <img src={collection_icon} width="60px" alt="collection_icon" />
          <Typography variant={'h3'} color={'text.primary'}>
            Create your collection
          </Typography>
          <Typography variant={'h5'} color={'text.primary'}>
            Click My Collections and set up your collection. Add social links, a description,
            profile & banner images, and set a secondary sales fee.
          </Typography>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          lg={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.5rem',
            p: '20px',
          }}
        >
          <img src={nft_icon} width="60px" alt="nft_icon" />
          <Typography variant={'h3'} color={'text.primary'}>
            Add your NFTs
          </Typography>
          <Typography variant={'h5'} color={'text.primary'}>
            Upload your work (image, video, audio, or 3D art), add a title and description, and
            customize your NFTs with properties, stats, and unlockable content.
          </Typography>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          lg={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.5rem',
            p: '20px',
          }}
        >
          <img src={taal_icon} width="60px" alt="taal_icon" />
          <Typography variant={'h3'} color={'text.primary'}>
            List them for sale
          </Typography>
          <Typography variant={'h5'} color={'text.primary'}>
            Choose between auctions, fixed-price listings, and declining-price listings. You choose
            how you want to sell your NFTs, and we help you sell them!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Introduction;
