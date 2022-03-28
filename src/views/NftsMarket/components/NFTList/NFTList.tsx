import React from 'react';
import MarketLayout from '../../../../layouts/market-layout/MarketLayout';
import { Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import CollectionItem from '../CollectionItem';
import NFTItem from '../NFTItem';
import { useParams } from 'react-router-dom';
import useUserInfo from '../../../../hooks/useUserInfo';
import useSWR from 'swr';
import { NFTResponse, NFTType } from '../../types';
import { getNFTData } from '../../../../services/nft.service';
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
            <Grid item xs={12} sm={6} md={3} key={index}>
              <NFTItem item={item} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default NFTList;
