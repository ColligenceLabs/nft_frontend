import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface DetailTitleProp {
  _id: string;
  name: string;
  full_name: string;
}

const DetailTitle: React.FC<DetailTitleProp> = ({ _id, name, full_name }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography
        component={Link}
        to={`/market/collection/${_id}`}
        variant={'h4'}
        color={'primary'}
        sx={{ textDecoration: 'none' }}
      >
        {name}
      </Typography>

      <Typography variant={'h1'}>{name}</Typography>
      <Box display={'flex'} sx={{ mt: 2 }}>
        <Typography variant={'h4'}>Author by</Typography>
        <Typography variant={'h4'} color={'primary'} sx={{ ml: 1, fontWeight: 800 }}>
          {full_name}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailTitle;
