import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoIcon from '../../../full-layout/logo/LogoIcon';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ProfileButton from '../../../../components/ProfileButton/ProfileButton';
import { useSelector } from 'react-redux';

const Topbar = (): JSX.Element => {
  const { user } = useSelector((state) => state?.auth);
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={1}>
      <LogoIcon />
      <Box sx={{ display: 'flex' }} alignItems={'center'}>
        <Box>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="subtitle1"
              color="primary"
              fontSize={{ xs: '12px', md: '14px' }}
              fontWeight={700}
            >
              Home
            </Typography>
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Link to="/market" style={{ textDecoration: 'none' }}>
            <Typography
              variant="subtitle1"
              color="primary"
              fontSize={{ xs: '12px', md: '14px' }}
              fontWeight={700}
            >
              NFTs Market
            </Typography>
          </Link>
        </Box>
        <Box marginLeft={4}>
          {user === null ? (
            <Button
              variant="contained"
              color="primary"
              component="a"
              href="/auth/login"
              size={'small'}
            >
              Login
            </Button>
          ) : (
            <ProfileButton />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
