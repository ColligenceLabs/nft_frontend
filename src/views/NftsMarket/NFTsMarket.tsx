import React, { useState } from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import CollectionList from './components/CollectionList/CollectionList';
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const categories = [
  { id: 0, category: 'All' },
  { id: 1, category: 'Top' },
  { id: 2, category: 'Game' },
  { id: 3, category: 'Graffiti' },
  { id: 4, category: 'Other' },
];

const NFTsMarket = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    category: 'All',
  });

  return (
    <MarketLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Typography variant={'h1'} fontWeight={800}>
          NFT Marketplace
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
