import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import talk_icon from '../../../../assets/images/logos/talken_icon.png';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // mint
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // sale
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // list
import PanToolIcon from '@mui/icons-material/PanTool'; // bid
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; // transfer
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material/styles';
import SectionWrapper from '../DetailComponents/SectionWrapper';

const FILTER_ITEM = [
  { value: 'list', caption: 'List' },
  { value: 'sale', caption: 'Sale' },
  { value: 'transfer', caption: 'Transfer' },
  { value: 'minted', caption: 'Minted' },
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
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
        {row.event.toLowerCase() === 'minted' && <AddShoppingCartIcon fontSize={'small'} />}
        {row.event.toLowerCase() === 'sale' && <ShoppingCartIcon fontSize={'small'} />}
        {row.event.toLowerCase() === 'bid' && <PanToolIcon fontSize={'small'} />}
        {row.event.toLowerCase() === 'list' && <LocalOfferIcon fontSize={'small'} />}
        {row.event.toLowerCase() === 'transfer' && <CompareArrowsIcon fontSize={'small'} />}
        {row.event.toLowerCase() === 'cancel' && <CancelIcon fontSize={'small'} />}
        <Typography variant={'h6'}>{row.event}</Typography>
      </Box>
    ),
  },
  {
    field: 'price',
    headerName: 'Price',
    sortable: false,
    width: 150,
    align: 'left',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
        {row.price !== null && row.price !== '' && (
          <img alt="talk_icon" style={{ width: '16px', height: '16px' }} src={talk_icon} />
        )}
        <Typography variant={'h6'}>{row.price}</Typography>
      </Box>
    ),
  },
  {
    field: 'from',
    headerName: 'From',
    sortable: false,
    width: 300,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.from}</Typography>,
  },
  {
    field: 'to',
    headerName: 'To',
    sortable: false,
    width: 300,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.to}</Typography>,
  },
  {
    field: 'date',
    headerName: 'Date',
    sortable: false,
    width: 150,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.date}</Typography>,
  },
];

const rows = [
  { id: 1, event: 'Cancel', price: '1', from: 'sueth', to: '', date: '22 Apr 2022 15:56:6' },
  { id: 2, event: 'List', price: '1', from: 'sueth', to: '', date: '22 Apr 2022 15:50:59' },
  { id: 3, event: 'List', price: '1', from: 'sueth', to: '', date: '22 Apr 2022 15:46:6' },
  {
    id: 4,
    event: 'Sale',
    price: '0.02',
    from: 'Nightmonster2021',
    to: 'sueth',
    date: '22 Apr 2022 7:49:22',
  },
  {
    id: 5,
    event: 'Transfer',
    price: '',
    from: 'Nightmonster2021',
    to: 'sueth',
    date: '22 Apr 2022 7:37:40',
  },
  { id: 6, event: 'Bid', price: '0.002', from: 'sueth', to: '', date: '22 Apr 2022 5:57:32' },
  {
    id: 7,
    event: 'List',
    price: '0.002',
    from: 'Nightmonster2021',
    to: '',
    date: '21 Apr 2022 18:38:8',
  },
  {
    id: 8,
    event: 'Minted',
    price: '',
    from: 'Null Address',
    to: 'Nightmonster2021',
    date: '21 Apr 2022 16:49:10',
  },
];

const ItemActivity = () => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState([] as any);

  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  return (
    <SectionWrapper title={'Item Activity'} icon={'activity'} toggled={true}>
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
    </SectionWrapper>
  );
};

export default ItemActivity;
