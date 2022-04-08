import React, { useEffect } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import CollectionItem from '../CollectionItem';
import useSWR from 'swr';
import { CollectionResponse } from '../../types';
import { getMarketCollectionData } from '../../../../services/market.service';

interface SelectedCategoryProp {
  selectedCategory: {
    id: number;
    category: string;
    value: string;
  };
}

const CollectionList: React.FC<SelectedCategoryProp> = ({ selectedCategory }) => {
  const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/market/indexs`;
  const { data, error, mutate } = useSWR<CollectionResponse>(API_URL, () =>
    getMarketCollectionData(selectedCategory.value),
  );

  useEffect(() => {
    mutate();
  }, [selectedCategory]);

  return (
    <Box>
      <Grid container>
        {!error &&
          data &&
          data?.data?.items.map((item) => (
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
          ))}
        {!error && data && data?.data?.items.length.toString() === '0' && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              border: '1px solid #d6d6d6',
              borderRadius: '30px',
              height: '100vh',
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
      </Grid>
    </Box>
  );
};

export default CollectionList;
