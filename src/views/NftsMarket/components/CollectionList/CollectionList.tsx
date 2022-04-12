import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import CollectionItem from '../CollectionItem';
import useSWRInfinite from 'swr/infinite';
import { CollectionResponse } from '../../types';

interface SelectedCategoryProp {
  selectedCategory: {
    id: number;
    category: string;
    value: string;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 8;

const CollectionList: React.FC<SelectedCategoryProp> = ({ selectedCategory }) => {
  const { data, size, setSize, mutate, error, isValidating } = useSWRInfinite<CollectionResponse>(
    (index) =>
      `${process.env.REACT_APP_API_SERVER}/admin-api/market/indexs?page=${
        index + 1
      }&perPage=${PAGE_SIZE}&category=${
        selectedCategory.value === 'all' ? '' : selectedCategory.value
      }`,
    fetcher,
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  // @ts-ignore
  const isEmpty = data?.[0]?.data?.items.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.headers?.x_pages_count <= size);
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    mutate();
  }, [selectedCategory]);

  return (
    <Box>
      <Grid container>
        {!error &&
          data &&
          data.map((result: CollectionResponse) => {
            return result.data?.items.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <CollectionItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  cover_image={item.image_link}
                  creator_image={item?.creator_id?.image}
                  creator_fullName={item?.creator_id?.full_name}
                />
              </Grid>
            ));
          })}

        {isEmpty && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              border: '1px solid #d6d6d6',
              borderRadius: '30px',
              height: '300px',
              m: '15px',
            }}
          >
            <Typography variant={'h2'}>No items to display</Typography>
          </Box>
        )}
        {!error && data === undefined && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
              border: '1px solid #d6d6d6',
              borderRadius: '30px',
              height: '300px',
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

export default CollectionList;
