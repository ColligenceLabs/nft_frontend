import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { mock } from './mock';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TopCollections = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const isLG = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  return (
    <Box
      sx={{
        mt: '30px',
      }}
    >
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
        <Typography fontSize={'30px'} fontWeight={'700'}>
          Top Collections over
        </Typography>
        <Typography fontSize={'30px'} fontWeight={'700'} color={'primary'}>
          last 7 days
        </Typography>
      </Box>
      <Box
        sx={{
          px: isLG ? '100px' : '0px',
          height: isMd ? '360px' : '',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {mock.map((item, index) => (
          <Box
            key={index}
            sx={{
              px: '10px',
              py: '15px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '300px',
              gap: '0.5rem',
              borderBottom: '0.5px solid #d6d6d6',
            }}
          >
            <Box>
              <Typography variant={'body2'} fontWeight={700}>
                {item.id + 1}
              </Typography>
            </Box>
            <Avatar src={item.image} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize={'13px'} fontWeight={700}>
                  {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                </Typography>
                <Typography
                  fontSize={'13px'}
                  fontWeight={700}
                  color={item.fluctuationRate > 0 ? 'primary' : 'red'}
                >
                  {item.fluctuationRate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize={'12px'} color={'text.secondary'}>
                  Floor price : {item.floorPrice}
                </Typography>
                <Typography fontSize={'12px'} color={'text.secondary'}>
                  {item.price}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopCollections;
