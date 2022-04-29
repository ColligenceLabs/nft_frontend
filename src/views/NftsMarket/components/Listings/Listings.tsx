import React from 'react';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PanToolIcon from '@mui/icons-material/PanTool';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CancelIcon from '@mui/icons-material/Cancel';
import talk_icon from '../../../../assets/images/logos/talken_icon.png';
import SectionWrapper from '../DetailComponents/SectionWrapper';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'unitPrice',
    headerName: 'Unit Price',
    sortable: false,
    width: 90,
    align: 'left',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
        <img alt="talk_icon" style={{ width: '16px', height: '16px' }} src={talk_icon} />
        <Typography variant={'h6'}>{row.unitPrice}</Typography>
      </Box>
    ),
  },
  {
    field: 'usdUnitPrice',
    headerName: 'USD Unit Price',
    sortable: false,
    width: 120,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.usdUnitPrice}</Typography>,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    sortable: false,
    width: 90,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.quantity}</Typography>,
  },
  {
    field: 'expiration',
    headerName: 'Expiration',
    sortable: false,
    width: 100,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.expiration}</Typography>,
  },
  {
    field: 'from',
    headerName: 'From',
    sortable: false,
    width: 90,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.from}</Typography>,
  },
  {
    field: 'buy',
    headerName: '',
    sortable: false,
    width: 150,
    align: 'left',
    renderCell: ({ row }) => (
      <Button size={'small'} variant={'contained'}>
        Buy
      </Button>
    ),
  },
];

const rows = [
  {
    id: 1,
    unitPrice: '2 Talk',
    usdUnitPrice: '$1.70',
    quantity: '1',
    expiration: '20 days',
    from: '0x62...5ff6',
  },
  {
    id: 2,
    unitPrice: '3 Talk',
    usdUnitPrice: '$2.70',
    quantity: '3',
    expiration: '19 days',
    from: '0x62...5ff6',
  },
];

const Listings = () => {
  return (
    <SectionWrapper title={'Listing'} icon={'info'}>
      <Box sx={{ backgroundColor: '#f0faf5', p: 1, borderRadius: 2 }}>
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

export default Listings;
