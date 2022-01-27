import * as React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import useNFT from '../../hooks/useNFT';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  Switch,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import FeatherIcon from 'feather-icons-react';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import Search from '../../components/Search/Search';

import { rows } from './data';
import { useKip17Contract } from '../../hooks/useContract';
import { useWeb3React } from '@web3-react/core';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'no',
    numeric: false,
    disablePadding: false,
    label: 'No',
    width: 10,
  },
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
    width: 10,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    width: 10,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    width: 10,
  },
  {
    id: 'collection',
    numeric: false,
    disablePadding: false,
    label: 'Collection',
    width: 10,
  },
  {
    id: 'sellingQuantity',
    numeric: false,
    disablePadding: false,
    label: 'Selling Quantity',
    width: 10,
  },
  {
    id: 'creator',
    numeric: false,
    disablePadding: false,
    label: 'Creator',
    width: 10,
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    width: 10,
  },
  {
    id: 'stopSelling',
    numeric: false,
    disablePadding: false,
    label: 'Stop Selling',
    width: 10,
  },
  {
    id: 'saleDate',
    numeric: false,
    disablePadding: false,
    label: 'Sale Date',
    width: 10,
  },
  {
    id: 'saleDate',
    numeric: false,
    disablePadding: false,
    label: 'Sale Date',
    width: 10,
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Created at',
    width: 10,
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputprops={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            // style={{ width: `${headCell.width}`, background: 'red' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, searchQuery, onChangeSearchQuery } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {numSelected > 0 ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography color="inherit" variant="subtitle2" component="div">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete">
            <IconButton>
              <FeatherIcon icon="trash-2" width="18" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div" marginRight="5px">
          Filter
        </Typography>
      )}

      <Search searchQuery={searchQuery} onChangeSearchQuery={onChangeSearchQuery} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onChangeSearchQuery: PropTypes.func.isRequired,
};

const NFTs = () => {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const onFilterName = (e) => {
    setFilterName(e.target.value);
  };
  console.log(searchQuery);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangeSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <PageContainer title="NFTs" description="this is NFTs page">
      {/* breadcrumb */}
      <Breadcrumb title={t('NFTs')} subtitle={t('NFTs Information')} />
      {/* end breadcrumb */}
      <Card>
        <CardContent>
          <Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar
                numSelected={selected.length}
                searchQuery={searchQuery}
                onChangeSearchQuery={handleChangeSearchQuery}
              />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <CustomCheckbox
                                color="primary"
                                checked={isItemSelected}
                                inputprops={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {index}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.description}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.collection}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {row.sellingQuantity.onSale === 1 ? (
                                <Chip
                                  label="On sale"
                                  color="primary"
                                  size={'small'}
                                  style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                                />
                              ) : (
                                <Chip
                                  label="Off sale"
                                  color={'secondary'}
                                  size={'small'}
                                  style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                                />
                              )}
                              <Chip
                                label={`Total Mint : ${row.sellingQuantity.totalMint}`}
                                color={'error'}
                                size={'small'}
                                style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                              />
                              <Chip
                                label={`Selling Quantity : ${row.sellingQuantity.sellingQuantity}`}
                                color={'success'}
                                size={'small'}
                                style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                              />
                              <Chip
                                label={`Prices : ${row.sellingQuantity.price}`}
                                color={'warning'}
                                size={'small'}
                                style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.creator}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                <Box display="flex" alignItems="center">
                                  <Box
                                    sx={{
                                      backgroundColor:
                                        row.status === 'Active'
                                          ? (theme) => theme.palette.success.main
                                          : row.status === 'Pending'
                                          ? (theme) => theme.palette.warning.main
                                          : row.status === 'Completed'
                                          ? (theme) => theme.palette.primary.main
                                          : row.status === 'Cancel'
                                          ? (theme) => theme.palette.error.main
                                          : (theme) => theme.palette.secondary.main,
                                      borderRadius: '100%',
                                      height: '10px',
                                      width: '10px',
                                    }}
                                  />
                                  <Typography
                                    color="textSecondary"
                                    variant="h6"
                                    sx={{
                                      ml: 0.5,
                                    }}
                                  >
                                    {row.status}
                                  </Typography>
                                </Box>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.stopSelling}
                                <Switch
                                  checked={row.stopSelling}
                                  // onChange={handleChange}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />
                              </Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 200 }}>
                              <Typography color="textSecondary" variant="h6">
                                {row.saleDate[0]}
                              </Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 200 }}>
                              <Typography color="textSecondary" variant="h6">
                                {row.createdAt}
                              </Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 200 }}>
                              {/*<Box display="flex" justifyContent={'space-around'}>*/}
                              <IconButton size={'small'}>
                                <RefreshOutlinedIcon />
                              </IconButton>
                              <IconButton size={'small'}>
                                <AlbumOutlinedIcon />
                              </IconButton>
                              <IconButton size={'small'}>
                                <DeleteOutlinedIcon />
                              </IconButton>
                              {/*</Box>*/}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default NFTs;
