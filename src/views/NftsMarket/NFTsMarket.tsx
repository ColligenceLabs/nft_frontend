import React, { useState } from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import CollectionList from './components/CollectionList/CollectionList';
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const categories = [
  { id: 0, value: 'all', category: 'All' },
  // { id: 1, value: 'top', category: 'Top' },
  // { id: 2, value: 'game', category: 'Game' },
  // { id: 3, value: 'graffiti', category: 'Graffiti' },
  // { id: 4, value: 'other', category: 'Other' },
  { id: 5, value: 'art', category: 'Art' },
  { id: 6, value: 'collectibles', category: 'Collectibles' },
  { id: 7, value: 'domainNames', category: 'Domain Names' },
  { id: 8, value: 'music', category: 'Music' },
  { id: 9, value: 'photography', category: 'Photography' },
  { id: 10, value: 'sports', category: 'Sports' },
  { id: 11, value: 'tradingCards', category: 'Trading Cards' },
  { id: 12, value: 'utility', category: 'Utility' },
  { id: 13, value: 'virtualWorlds', category: 'Virtual Worlds' },
];

const NFTsMarket = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    category: 'All',
    value: 'all',
  });

  return (
    <MarketLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Typography variant={'h1'} fontWeight={800}>
          Marketplace
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
          gap: smDown ? '0.2rem' : '2rem',
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              borderBottom:
                selectedCategory.id === category.id
                  ? `2px solid ${theme.palette.primary.main}`
                  : '',
              pb: '5px',
              px: '5px',
              cursor: 'pointer',
              color:
                selectedCategory.id === category.id
                  ? `${theme.palette.text.primary}`
                  : `${theme.palette.text.secondary}`,
            }}
            onClick={() => setSelectedCategory(category)}
          >
            <Typography variant={'h6'} fontWeight={selectedCategory.id === category.id ? 800 : ''}>
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
