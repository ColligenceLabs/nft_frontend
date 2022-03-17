import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NFTResponse, NFTType } from '../../types';

const mock = {
  id: 'wef12332d',
  name: 'Candy Hunter #8962',
  description:
    "Glory, Fame, a taste of the world's sweetest treats. Only those who are brave enough to venture into Sweetopia are worthy of these claims.",
  price: 200,
  image:
    'https://lh3.googleusercontent.com/1CELJj-3YMsnJSlGFR0ZPnUDHa_JqIphWNVhf3-z3orCOHqmkljiYvplm_mMGmL_j11aXITMHxuO0KFztBqHktwpCVJbgJg1BF1Q5wM=w600',
  author: 'helloljho',
};

interface NftItemType {
  id: string;
}

const NFTItem: React.FC<NFTType> = ({ item }) => {
  const theme = useTheme();
  return (
    <>
      <Link to={`/market/${item._id}/detail`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            maxWidth: 345,
            p: 2,
            textDecoration: 'none',
            transition: 'all .2s ease-in-out',
            border: '0.1px solid gray',
            borderRadius: '25px',
            '&:hover': {
              transform: `translateY(-${theme.spacing(1 / 2)})`,
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardMedia
              component="img"
              height="250"
              image={item?.metadata?.image}
              alt={item?.metadata?.name}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item?.metadata?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.metadata?.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default NFTItem;
