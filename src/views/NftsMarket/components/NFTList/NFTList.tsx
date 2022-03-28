import React from 'react';
import { Box, Grid } from '@mui/material';
import NFTItem from '../NFTItem';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { NFTResponse } from '../../types';
import { getMarketNFTData } from '../../../../services/market.service';

const NFTList = () => {
  const { id } = useParams();
  const { data, error } = useSWR<NFTResponse>('/admin-api/nft/indexs', () =>
    getMarketNFTData(0, undefined, undefined, undefined, id, undefined),
  );
  return (
    <Box>
      <Grid container>
        {!error &&
          data &&
          data?.data?.items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <NFTItem item={item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default NFTList;
