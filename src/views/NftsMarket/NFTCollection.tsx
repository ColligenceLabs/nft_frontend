import React from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import { Box, Typography } from '@mui/material';
import NFTList from './components/NFTList';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getCollectionById } from '../../services/collections.service';
import { CollectionDetailResponse } from './types';

const NFTCollection = () => {
  const { id } = useParams();
  const { data, error } = useSWR<CollectionDetailResponse>(
    `/admin-api/collection/detail/${id}`,
    () => getCollectionById(id),
  );

  return (
    <>
      <MarketLayout>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: 1, height: '250px' }}>
            <img
              src={data?.cover_image}
              alt={'test'}
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
              src={data?.creator_id?.image.replace(
                'https://nftbedev.talken.io/talkenNft/uploads',
                'http://localhost:4000/talkenNft',
              )}
              alt={data?.creator_id?.full_name}
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
            <Typography variant={'h1'}>{data?.name}</Typography>
            <Typography variant={'body1'}>{data?.description}</Typography>
          </Box>
        </Box>
        <Container>
          <NFTList />
        </Container>
      </MarketLayout>
    </>
  );
};

export default NFTCollection;
