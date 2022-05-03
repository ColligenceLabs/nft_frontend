import React, { useState } from 'react';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import Container from './components/Container';
import CollectionList from './components/CollectionList/CollectionList';
import { Box, useTheme, Typography, Select, MenuItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const categories = [
  { id: 0, value: 'all', category: 'All' },
  { id: 1, value: 'talken', category: 'Talken' },
  { id: 2, value: 'art', category: 'Art' },
  { id: 3, value: 'collectibles', category: 'Collectibles' },
  { id: 4, value: 'membership', category: 'Membership' },
  { id: 5, value: 'pieces', category: 'Pieces' },
  { id: 6, value: 'games', category: 'Games' },
  { id: 7, value: 'virtual', category: 'Virtual Worlds' },
];

const NFTsMarket = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    category: 'All',
    value: 'all',
  });

  const handleChange = (e: any) => {
    const value = e.target.value;
    const temp = categories.filter((category) => category.value === value);
    console.log(temp);
    setSelectedCategory(temp[0]);
  };

  return (
    <MarketLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Typography variant={'h1'} fontWeight={800}>
          Marketplace
        </Typography>
      </Box>

      {mdDown ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderBottom: '1px solid',
            borderColor: `#d9d9d9`,
            mt: 5,
            mb: 0,
          }}
        >
          <Select
            value={selectedCategory.value}
            onChange={handleChange}
            sx={{ m: mdDown ? '0px 30px 15px 0px' : '0px', minWidth: '150px', height: '40px' }}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.value}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : (
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: `#d9d9d9`,
            width: '100%',
            mt: 7,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
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
              <Typography
                variant={'h6'}
                fontWeight={selectedCategory.id === category.id ? 800 : ''}
              >
                {category.category}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Container style={{ marginTop: '-30px' }}>
        <CollectionList selectedCategory={selectedCategory} />
      </Container>
    </MarketLayout>
  );
};

export default NFTsMarket;
