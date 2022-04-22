import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'event',
    headerName: 'Event',
    sortable: false,
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'price',
    headerName: 'Price',
    sortable: false,
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'from',
    headerName: 'From',
    sortable: false,
    width: 300,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'to',
    headerName: 'To',
    sortable: false,
    width: 300,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'date',
    headerName: 'Date',
    sortable: false,
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
];

const rows = [
  { id: 1, event: 'Cancel', price: '1', from: 'sueth', to: '', date: 'an hour ago' },
  { id: 2, event: 'List', price: '1', from: 'sueth', to: '', date: 'an hour ago' },
  { id: 3, event: 'List', price: '1', from: 'sueth', to: '', date: '2 hour ago' },
  {
    id: 4,
    event: 'Sale',
    price: '0.02',
    from: 'Nightmonster2021',
    to: 'sueth',
    date: '2 hour ago',
  },
  {
    id: 5,
    event: 'Transfer',
    price: '',
    from: 'Nightmonster2021',
    to: 'sueth',
    date: '2 hour ago',
  },
  { id: 6, event: 'Bid', price: '0.002', from: 'sueth', to: '', date: '2 hour ago' },
  { id: 7, event: 'List', price: '0.002', from: 'Nightmonster2021', to: '', date: '2 hour ago' },
  {
    id: 8,
    event: 'Minted',
    price: '',
    from: 'Null Address',
    to: 'Nightmonster2021',
    date: '18 days ago',
  },
];

const ItemActivity = () => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState([] as any);

  const data = [{ id: 1, name: 'test', address: 'test' }];

  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  return (
    <Box sx={{ backgroundColor: '#f0faf5', p: 1, borderRadius: 2 }}>
      <Box sx={{ pb: 1 }}>
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
                gap: 1,
              }}
            >
              {selected.map((value: any) => (
                <Box
                  key={value}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    backgroundColor: `${theme.palette.primary.main}`,
                    px: 2,
                    borderRadius: '10px',
                  }}
                >
                  <Typography variant={'subtitle2'} color={'white'}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {FILTER_ITEM.map((name) => (
            <MenuItem key={name.value} value={name.value}>
              {name.caption}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ height: '368px', backgroundColor: 'white' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          hideFooterSelectedRowCount
          disableColumnMenu
        />
      </Box>
    </Box>
  );
};

export default ItemActivity;
