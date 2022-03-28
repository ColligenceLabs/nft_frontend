import React, { useState } from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import CollectionList from './components/CollectionList/CollectionList';
import { Box, useTheme, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const categories = [
  { id: 0, category: 'All' },
  { id: 1, category: 'Top' },
  { id: 2, category: 'Game' },
  { id: 3, category: 'Graffiti' },
  { id: 4, category: 'Other' },
];

const NFTsMarket = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    category: 'All',
  });

  return (
    <MarketLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography variant={'h1'} fontWeight={800}>
          Collections
        </Typography>
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: `#d9d9d9`,
          width: '100%',
          mt: 7,
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              borderBottom:
                selectedCategory.id === category.id
                  ? `3px solid ${theme.palette.primary.main}`
                  : '',
              pb: '5px',
              px: '15px',
              cursor: 'pointer',
              color:
                selectedCategory.id === category.id
                  ? `${theme.palette.text.primary}`
                  : `${theme.palette.text.secondary}`,
            }}
            onClick={() => setSelectedCategory(category)}
          >
            <Typography fontWeight={selectedCategory.id === category.id ? 800 : ''}>
              {category.category}
            </Typography>
          </Box>
        ))}
      </Box>

      <Container style={{ marginTop: '-30px' }}>
        <CollectionList selectedCategory={selectedCategory} />
      </Container>
    </MarketLayout>
  );
};

export default NFTsMarket;
