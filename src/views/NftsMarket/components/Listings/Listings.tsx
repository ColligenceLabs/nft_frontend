import React, { useEffect, useState } from 'react';
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
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import useSWR from 'swr';
import { CollectionResponse, NFTResponse } from '../../types';
import useSWRInfinite from 'swr/infinite';
import splitAddress from '../../../../utils/splitAddress';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'price',
    headerName: 'Unit Price',
    sortable: false,
    width: 90,
    align: 'left',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
        <img alt="talk_icon" style={{ width: '16px', height: '16px' }} src={talk_icon} />
        <Typography variant={'h6'}>{row.price}</Typography>
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
    field: 'seller',
    headerName: 'From',
    sortable: false,
    width: 120,
    align: 'left',
    renderCell: ({ row }) => <Typography variant={'h6'}>{row.seller}</Typography>,
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

interface SaleListResponse {
  status: number;
  data: [
    {
      _id: string;
      collection_id: string;
      createdAt: Date;
      nft_id: string;
      price: number;
      quantity: number;
      seller: string;
      sold: number;
      token_id: string;
    },
  ];
  message: string;
}

interface SaleItemTypes {
  id: string;
  _id: string;
  collection_id: string;
  createdAt: Date;
  nft_id: string;
  price: number;
  quantity: number;
  seller: string;
  sold: number;
  token_id: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ListingsProps {
  id: string;
}

const Listings: React.FC<ListingsProps> = ({ id }) => {
  const [saleList, setSaleList] = useState<SaleItemTypes[]>([]);
  const { data, size, setSize, mutate, error, isValidating } = useSWRInfinite<SaleListResponse>(
    (index) =>
      `${process.env.REACT_APP_API_SERVER}/admin-api/market/saleList/${id}?page=${index}&size=5`,
    fetcher,
  );

  // const { data, error, mutate } = useSWR(
  //   `${process.env.REACT_APP_API_SERVER}/admin-api/market/saleList/${id}?page=0&size=10`,
  //   fetcher,
  // );

  useEffect(() => {
    if (data && data[0]?.data !== undefined) {
      console.log(data);
      // setSaleList(data[0]?.data);
      const result = data[0]?.data.map((sale, index) => ({
        ...sale,
        id: sale._id,
        seller: splitAddress(sale.seller),
      }));
      setSaleList(result);
    }
  }, [data]);

  return (
    <SectionWrapper title={'Listing'} icon={<FormatListBulletedOutlinedIcon />}>
      <Box sx={{ backgroundColor: '#f0faf5', p: 1, borderRadius: 2 }}>
        <Box sx={{ height: '368px', backgroundColor: 'white' }}>
          <DataGrid
            // rows={rows}
            rows={saleList}
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
