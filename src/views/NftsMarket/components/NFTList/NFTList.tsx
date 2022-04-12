import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import NFTItem from '../NFTItem';
import { useParams } from 'react-router-dom';

import useSWRInfinite from 'swr/infinite';
import { NFTResponse } from '../../types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 2;

const NFTList = () => {
  const { id } = useParams();
  const { data, size, setSize, error, isValidating } = useSWRInfinite<NFTResponse>(
    (index) =>
      `${process.env.REACT_APP_API_SERVER}/admin-api/nft/indexs?type=0&page=${
        index + 1
      }&perPage=${PAGE_SIZE}&onchain=true&collection_id=${id}`,
    fetcher,
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  // @ts-ignore
  const isEmpty = data?.[0]?.data?.items.length === 0;

  // @ts-ignore
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.headers?.x_pages_count <= size);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <Box>
      <Grid container>
        {!error &&
          data &&
          data.map((result: NFTResponse) => {
            return result.data?.items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <NFTItem item={item} />
              </Grid>
            ));
          })}

        {!error && data?.[size - 1] === undefined && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
              border: '1px solid #d6d6d6',
              borderRadius: '30px',
              height: '100vh',
              m: '15px',
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2 }} variant={'h4'} color={'primary'}>
              Loading...
            </Typography>
          </Box>
        )}
        {!isEmpty && (
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ px: 2 }}>
            {!(isLoadingMore || isReachingEnd) && (
              <Button fullWidth variant={'contained'} onClick={() => setSize(size + 1)}>
                {isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more NFTs' : 'Load more'}
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default NFTList;
