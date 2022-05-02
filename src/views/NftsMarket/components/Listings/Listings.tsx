import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TablePagination,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import SectionWrapper from '../DetailComponents/SectionWrapper';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import useSWR from 'swr';
import splitAddress from '../../../../utils/splitAddress';
import klayLogo from '../../../../assets/images/network_icon/klaytn-klay-logo.png';
import talkLogo from '../../../../assets/images/logos/talken_icon.png';
import { useWeb3React } from '@web3-react/core';

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
  priceUsd: number;
  quote: string;
  seller_caption: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface ListingsProps {
  id: string;
  sellResult: boolean;
}

const Listings: React.FC<ListingsProps> = ({ id, sellResult }) => {
  const context = useWeb3React();
  const { account } = context;
  const [saleList, setSaleList] = useState<SaleItemTypes[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const url = `${process.env.REACT_APP_API_SERVER}/admin-api/market/saleList/${id}?page=${
    page + 1
  }&size=${rowsPerPage}`;

  const { data, mutate, error } = useSWR(url, fetcher);

  useEffect(() => {
    mutate();
  }, [page]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBuy = (row: SaleItemTypes) => {
    console.log(row);
  };

  const handleCancel = (row: SaleItemTypes) => {
    console.log(row.seller);
    console.log(account);
  };

  useEffect(() => {
    if (data && data?.data !== undefined) {
      const result = data?.data?.items.map((sale: SaleItemTypes) => ({
        ...sale,
        id: sale._id,
        seller_caption: splitAddress(sale.seller),
      }));
      console.log(result);
      setSaleList(result);
      // setPageSize(data?.data?.headers.x_pages_count);
      setRowCount(data?.data?.headers.x_total_count);
    }
  }, [data]);

  useEffect(() => {
    if (sellResult) {
      mutate();
    }
  }, [sellResult]);

  return (
    <SectionWrapper title={'Listing'} icon={<FormatListBulletedOutlinedIcon />}>
      <Box
        sx={{
          backgroundColor: '#f0faf5',
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
          }}
        >
          <TableContainer>
            <Table aria-labelledby="tableTitle" size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell align={'left'} padding={'normal'}>
                    Unit Price
                  </TableCell>
                  <TableCell align={'left'} padding={'normal'}>
                    USD Unit Price
                  </TableCell>
                  <TableCell align={'left'} padding={'normal'}>
                    Quantity
                  </TableCell>
                  <TableCell align={'left'} padding={'normal'}>
                    Expiration
                  </TableCell>
                  <TableCell align={'left'} padding={'normal'}>
                    From
                  </TableCell>
                  <TableCell align={'left'} padding={'normal'}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saleList.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {row?.quote === 'klay' && <img src={klayLogo} alt="klay" height="16px" />}
                          {row?.quote === 'talk' && <img src={talkLogo} alt="klay" height="16px" />}

                          <Typography variant={'h6'}>{row.price}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {`$ ${row.priceUsd.toFixed(4)}`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          null
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.seller_caption}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {row.seller === account ? (
                            <Button
                              variant={'contained'}
                              size={'small'}
                              onClick={() => handleCancel(row)}
                            >
                              Cancel
                            </Button>
                          ) : (
                            <Button
                              variant={'contained'}
                              size={'small'}
                              onClick={() => handleBuy(row)}
                            >
                              Buy
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rowCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default Listings;
