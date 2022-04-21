import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useSWR from 'swr';
import { TrendingCategoryItem, TrendingCategoryResponse } from '../../types';
import taal_logo from '../../../../assets/images/landing_icon/introduction_taal.svg';
import { Link } from 'react-router-dom';

interface CategoryTypes {
  id: number;
  value: string;
  caption: string;
}

const CATEGORY: CategoryTypes[] = [
  {
    id: 0,
    value: '1',
    caption: 'last 24 hours',
  },
  {
    id: 1,
    value: '7',
    caption: 'last 7 days',
  },
  {
    id: 2,
    value: '30',
    caption: 'last 30 days',
  },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TopCollections = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [category, setCategory] = useState<CategoryTypes>(CATEGORY[1]);
  const [emptyItem, setEmptyItem] = useState([0]);

  const { data } = useSWR<TrendingCategoryResponse>(
    `${process.env.REACT_APP_API_SERVER}/admin-api/collection/top?days=${category.value}d&size=15&page=0`,
    fetcher,
  );

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

  useEffect(() => {
    if (data?.data && data?.data.length < 15) {
      const loopCount = 15 - data?.data.length;
      const arr = Array.from({ length: loopCount }, (v, i) => i);
      setEmptyItem(arr);
    }
  }, [data?.data]);

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
        {data?.data.map((item: TrendingCategoryItem, index: number) => (
          <Link
            key={index}
            to={`/market/collection/${item._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={{
                px: '10px',
                py: '15px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: smDown ? '300px' : '350px',
                gap: '0.5rem',
                borderBottom: '0.5px solid #d6d6d6',
                cursor: 'pointer',
                '&:hover': {
                  // boxShadow: '60px -16px teal',
                  // boxShadow: '10px 5px 5px black',
                  boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 0.2)',
                  //
                },
              }}
            >
              <Box>
                <Typography variant={'body2'} fontWeight={700}>
                  {index + 1}
                </Typography>
              </Box>
              <Avatar src={item.image_link} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontSize={'13px'} fontWeight={700}>
                    {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
                  </Typography>
                  {/*<Typography*/}
                  {/*  fontSize={'13px'}*/}
                  {/*  fontWeight={700}*/}
                  {/*  color={item.fluctuationRate > 0 ? 'primary' : 'red'}*/}
                  {/*>*/}
                  {/*  {item.fluctuationRate}*/}
                  {/*</Typography>*/}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontSize={'12px'} color={'text.secondary'}>
                    Floor price : 2222
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography fontSize={'12px'} color={'text.secondary'} fontWeight={500}>
                      $ {item.total_volume_usd.toFixed(4)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
        {emptyItem.length > 0 &&
          emptyItem.map((item, index) => (
            <Box
              key={index}
              sx={{
                px: '10px',
                py: '15px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: smDown ? '300px' : '350px',
                gap: '0.5rem',
                borderBottom: '0.5px solid #d6d6d6',
              }}
            >
              <Box>
                <Typography variant={'body2'} fontWeight={700}>
                  -
                </Typography>
              </Box>
              <Avatar src={taal_logo} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontSize={'13px'} fontWeight={700}>
                    No Item
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
