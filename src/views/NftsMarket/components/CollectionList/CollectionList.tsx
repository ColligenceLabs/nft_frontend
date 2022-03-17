import React from 'react';
import { Box, Grid } from '@mui/material';
import CollectionItem from '../CollectionItem';
import useSWR from 'swr';
import { getCollectionData } from '../../../../services/collections.service';
import { CollectionResponse } from '../../types';

const CollectionList = (): JSX.Element => {
  const { data, error } = useSWR<CollectionResponse>(
    '/admin-api/collection/indexs',
    getCollectionData,
  );
  console.log(data);
  return (
    <Box>
      <Grid container spacing={4}>
        {!error &&
          data &&
          data?.data?.items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <CollectionItem
                id={item._id}
                name={item.name}
                description={item.description}
                cover_image={item.cover_image}
                creator_image={item?.creator_id?.image}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CollectionList;
