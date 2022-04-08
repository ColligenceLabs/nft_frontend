import React from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import { Box, Typography } from '@mui/material';
import NFTList from './components/NFTList';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { CollectionDetailResponse } from './types';
import { getNFTsByCollectionId } from '../../services/market.service';

const NFTCollection = () => {
  const { id } = useParams();
  const { data, error } = useSWR<CollectionDetailResponse>(
    `/admin-api/collection/detail/${id}`,
    () => getNFTsByCollectionId(id),
  );

  return (
    <>
      <MarketLayout>
        {!error && data && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: 1, height: '250px' }}>
              <img
                src={data?.image_link}
                alt={data?.name}
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
                src={data?.creator_id?.image?.replace(
                  'https://nftbedev.talken.io/talkenNft/uploads',
                  'http://localhost:4000/talkenNft',
                )}
                alt={data?.creator_id?.full_name}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '100%',
                }}
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  mb: '10px',
                }}
              >
                <Typography variant={'body1'}>Created by</Typography>
                <Typography variant={'body1'} color={'primary'}>
                  {data?.creator_id?.full_name}
                </Typography>
              </Box>

              <Typography sx={{ px: 3, textAlign: 'center' }} variant={'body1'}>
                {data?.description}
              </Typography>
            </Box>
          </Box>
        )}

        <Container>
          <NFTList />
        </Container>
      </MarketLayout>
    </>
  );
};

export default NFTCollection;
