import React, { useState, useEffect } from 'react';
import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import CustomTextField from '../../../../components/forms/custom-elements/CustomTextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTheme } from '@mui/material/styles';

const FILTER_ITEM = [
  { value: 'listing', caption: 'Listing' },
  { value: 'sales', caption: 'Sales' },
  { value: 'bids', caption: 'Bids' },
  { value: 'transfer', caption: 'Transfer' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ItemActivity = () => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState([] as any);
  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  return (
    <Box sx={{ backgroundColor: '#f0faf5' }}>
      <Box sx={{ m: 1 }}>
        <Select
          multiple
          fullWidth
          value={selectedFilter}
          onChange={(event) => {
            setSelectedFilter(event.target.value);
          }}
          sx={{ p: 0, m: 0, backgroundColor: 'white' }}
          // input={<OutlinedInput label="Filter" />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              }}
            >
              {selected.map((value: any) => (
                <Box
                  key={value}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'white',
                    gap: 1,
                    backgroundColor: `${theme.palette.primary.main}`,
                    px: 2,
                    borderRadius: '2px',
                  }}
                >
                  <Typography>{value}</Typography>
                  {/*<CloseOutlinedIcon fontSize={'small'} onClick={() => console.log('asdfwsefsd')} />*/}
                </Box>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {FILTER_ITEM.map((name) => (
            <MenuItem
              key={name.value}
              value={name.value}
              // style={getStyles(name, personName, theme)}
            >
              {name.caption}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          borderTop: 0.5,
          borderBottom: 0.5,
          borderColor: '#d6d6d6',
        }}
      >
        <Box sx={{}}>Event</Box>
        <Box sx={{}}>Price</Box>
        <Box sx={{}}>From</Box>
        <Box sx={{}}>To</Box>
        <Box sx={{}}>Date</Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#f0faf5',
          display: 'flex',
          justifyContent: 'space-around',
          height: '25px',
        }}
      >
        <Box sx={{}}>Minted</Box>
        <Box sx={{}}>-</Box>
        <Box sx={{}}>NullAddress</Box>
        <Box sx={{}}>0x623C7425....9F0675A5ff6</Box>
        <Box sx={{}}>5 days ago</Box>
      </Box>
    </Box>
  );
};

export default ItemActivity;
