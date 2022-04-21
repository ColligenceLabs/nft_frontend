import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, InputAdornment, MenuItem, useTheme } from '@mui/material';
import CustomTextField from '../../../../components/forms/custom-elements/CustomTextField';
import SearchIcon from '@mui/icons-material/Search';
import CustomSelect from '../../../../components/forms/custom-elements/CustomSelect';
import useMediaQuery from '@mui/material/useMediaQuery';
import ViewModeSelector from '../ViewModeSelector';

interface ItemFilterProp {
  filterSet: object;
  setFilterSet: React.Dispatch<React.SetStateAction<{}>>;
  onClickFilter: () => void;
  showLarge: boolean;
  onClickViewMode: (flag: boolean) => void;
}

const SORTING_CATEGORY = [
  { id: 0, value: 'recent', caption: 'Recent' },
  { id: 1, value: 'oldest', caption: 'Oldest' },
  { id: 2, value: 'priceLowToHigh', caption: 'Price Low to High' },
  { id: 3, value: 'priceHighToLow', caption: 'Price High to Low' },
];

const ItemFilter: React.FC<ItemFilterProp> = ({
  filterSet,
  setFilterSet,
  onClickFilter,
  showLarge,
  onClickViewMode,
}) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  const [sorting, setSoting] = useState(SORTING_CATEGORY[0].value);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const onChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const onChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const onSelectSortingCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSoting(e.target.value);
  };

  useEffect(() => {
    setFilterSet({ ...filterSet, sorting, searchKeyword, minPrice, maxPrice });
  }, [sorting, searchKeyword, minPrice, maxPrice]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: mdDown ? 'column' : 'row',
        flex: '1',
        width: '100%',
        px: '10px',
        mt: '-10px',
        mb: '25px',
        gap: 2,
      }}
    >
      <Box
        sx={
          smDown
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
              }
            : { flex: 1 }
        }
      >
        <CustomTextField
          fullWidth
          sx={{ flexGrow: 1 }}
          size={'small'}
          placeholder={'Search'}
          onChange={onChangeSearchKeyword}
          InputProps={{
            startAdornment: (
              <InputAdornment position={'start'}>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {smDown && <ViewModeSelector showLarge={showLarge} onClickViewMode={onClickViewMode} />}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: smDown ? 'column' : 'row',
          gap: 2,
        }}
      >
        <CustomSelect
          value={sorting}
          onChange={onSelectSortingCategory}
          variant="outlined"
          size="small"
          sx={{ minWidth: '185px' }}
        >
          {SORTING_CATEGORY.map((category, index) => (
            <MenuItem key={index} value={category.value}>
              {category.caption}
            </MenuItem>
          ))}
        </CustomSelect>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CustomTextField
            size={'small'}
            type={'number'}
            placeholder={'Min Price'}
            onChange={onChangeMinPrice}
            sx={{ flexGrow: 1, maxWidth: mdDown ? '100%' : '120px' }}
          />
          <Box sx={{ flexGrow: 0 }}>~</Box>
          <CustomTextField
            size={'small'}
            type={'number'}
            placeholder={'Max Price'}
            onChange={onChangeMaxPrice}
            sx={{ flexGrow: 1, maxWidth: mdDown ? '100%' : '120px' }}
          />
        </Box>

        <Button size={'small'} variant={'contained'} onClick={onClickFilter}>
          Filter
        </Button>
        {!smDown && <ViewModeSelector showLarge={showLarge} onClickViewMode={onClickViewMode} />}
      </Box>
    </Box>
  );
};

export default ItemFilter;
