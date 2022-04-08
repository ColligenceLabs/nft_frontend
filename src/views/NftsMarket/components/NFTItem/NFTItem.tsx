import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NFTType } from '../../types';
import klayLogo from '../../../../assets/images/network_icon/klaytn-klay-logo.png';

const NFTItem: React.FC<NFTType> = ({ item }) => {
  const theme = useTheme();
  return (
    <>
      <Link to={`/market/detail/${item._id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            p: 0,
            textDecoration: 'none',
            transition: 'all .2s ease-in-out',
            border: '0.1px solid #d6d6d6',
            borderRadius: '25px',
            '&:hover': {
              transform: `translateY(-${theme.spacing(1 / 2)})`,
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardMedia
              component={'img'}
              height="270"
              image={item?.metadata?.thumbnail}
              alt={item?.metadata?.name}
            />
          </Box>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" color="text.secondary">
                  {item?.collection_id?.name}
                </Typography>
                <Typography variant="h4">{item?.metadata?.name}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Price
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <img src={klayLogo} alt="klay" height="16px" />
                  <Typography variant="h4">{item?.price}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default NFTItem;
