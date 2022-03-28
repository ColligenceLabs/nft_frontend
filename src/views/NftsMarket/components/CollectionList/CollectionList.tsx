import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionItem from '../CollectionItem';
import useSWR from 'swr';
import { CollectionResponse } from '../../types';
import { getMarketCollectionData } from '../../../../services/market.service';

interface SelectedCategoryProp {
  selectedCategory: {
    id: number;
    category: string;
  };
}

const CollectionList: React.FC<SelectedCategoryProp> = ({ selectedCategory }) => {
  const [categoryKeyword, setCategoryKeyword] = useState('');
  const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/market/indexs`;
  const { data, error, mutate } = useSWR<CollectionResponse>(API_URL, () =>
    getMarketCollectionData(selectedCategory.category.toLowerCase()),
  );
  //
  useEffect(() => {
    // if (selectedCategory?.category !== undefined) {
    //   setCategoryKeyword(selectedCategory.category.toLowerCase());
    mutate();
    // }
  }, [selectedCategory]);

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
                creator_fullName={item?.creator_id?.full_name}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CollectionList;
