import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ItemProps } from '../../types';

const MyComponent = ({ item }: ItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Box
      display={'block'}
      width={1}
      height={1}
      sx={{
        textDecoration: 'none',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: `translateY(-${theme.spacing(1 / 2)})`,
        },
      }}
    >
      <Link to={`/market/${item.id}`} style={{ textDecoration: 'none' }}>
        <Box component={Card} width={1} height={1} display={'flex'} flexDirection={'column'}>
          <CardMedia
            image={item.image}
            title={item.title}
            sx={{
              height: { xs: 340, md: 400 },
              filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
            }}
          />
          <Box component={CardContent}>
            <Typography variant={'h6'} fontWeight={700} gutterBottom>
              {item.title}
            </Typography>
            <Typography variant={'body2'} color="text.secondary">
              {item.description}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Box component={CardActions} justifyContent={'flex-start'}>
            <Button
              size="large"
              endIcon={
                <svg
                  width={16}
                  height={16}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              }
            >
              Buy NFT
            </Button>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default MyComponent;
