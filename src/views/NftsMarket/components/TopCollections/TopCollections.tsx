import React, { useState } from 'react';
import { Avatar, Box, Button, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { mock } from './mock';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface CategoryTypes {
  id: number;
  value: string;
  caption: string;
}

const CATEGORY: CategoryTypes[] = [
  {
    id: 0,
    value: 'last24hours',
    caption: 'last 24 hours',
  },
  {
    id: 1,
    value: 'last7days',
    caption: 'last 7 days',
  },
  {
    id: 2,
    value: 'last30days',
    caption: 'last 30 days',
  },
];

const TopCollections = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [category, setCategory] = useState<CategoryTypes>(CATEGORY[1]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategory = (selectedCategory: CategoryTypes) => {
    setCategory(selectedCategory);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const isLG = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  return (
    <Box
      sx={{
        mt: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: smDown ? 'column' : 'row',
          gap: '0.5rem',
          mb: '50px',
        }}
      >
        <Typography fontSize={'30px'} fontWeight={'700'}>
          Top Collections over
        </Typography>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ fontSize: '30px', fontWeight: '700', color: 'primary' }}
        >
          {category.caption}
          <KeyboardArrowDownIcon />
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {CATEGORY.map((item, index) => (
            <Box key={index} sx={{ minWidth: '200px' }}>
              <MenuItem onClick={() => handleCategory(item)}>{item.caption}</MenuItem>
              {index < CATEGORY.length - 1 && <Divider />}
            </Box>
          ))}
        </Menu>
      </Box>
      <Box
        sx={{
          px: isLG ? '100px' : '0px',
          height: isMd ? '360px' : '',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {mock.map((item, index) => (
          <Box
            key={index}
            sx={{
              px: '10px',
              py: '15px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: smDown ? '100%' : '300px',
              gap: '0.5rem',
              borderBottom: '0.5px solid #d6d6d6',
            }}
          >
            <Box>
              <Typography variant={'body2'} fontWeight={700}>
                {item.id + 1}
              </Typography>
            </Box>
            <Avatar src={item.image} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize={'13px'} fontWeight={700}>
                  {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                </Typography>
                <Typography
                  fontSize={'13px'}
                  fontWeight={700}
                  color={item.fluctuationRate > 0 ? 'primary' : 'red'}
                >
                  {item.fluctuationRate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontSize={'12px'} color={'text.secondary'}>
                  Floor price : {item.floorPrice}
                </Typography>
                <Typography fontSize={'12px'} color={'text.secondary'}>
                  {item.price}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopCollections;
