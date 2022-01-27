import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { styled, alpha } from '@mui/material/styles';
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
  InputBase,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import FeatherIcon from 'feather-icons-react';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import Search from '../../components/Search/Search';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';

const rows = [
  {
    _id: {
      $oid: '61b59c13af06080b8a7aa0b8',
    },
    address: null,
    uid: 'wLdOowqA',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2021-12-12T06:52:03.696Z',
    },
    updatedAt: {
      $date: '2021-12-12T06:52:03.696Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61b59e53af06080b8a7aa0eb',
    },
    address: null,
    uid: 'tuZwDA3u',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2021-12-12T07:01:39.231Z',
    },
    updatedAt: {
      $date: '2021-12-12T07:01:39.231Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61b5b0f1275f260e293d6bdb',
    },
    address: null,
    uid: 'WOhZ4nHm',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2021-12-12T08:21:05.208Z',
    },
    updatedAt: {
      $date: '2021-12-12T08:21:05.208Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61b5b2fba80c7f0ea25112f7',
    },
    address: null,
    uid: 'M3WzZgn5',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2021-12-12T08:29:47.700Z',
    },
    updatedAt: {
      $date: '2021-12-12T08:29:47.700Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61b7142542f5221b36768fdc',
    },
    address: null,
    uid: '9v4R6Tbd',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2021-12-13T09:36:37.762Z',
    },
    updatedAt: {
      $date: '2021-12-13T09:36:37.762Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61ca6fc50004484790afcb05',
    },
    address: null,
    uid: '6oFbRNqG',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2021-12-28T02:00:37.324Z',
    },
    updatedAt: {
      $date: '2021-12-28T02:00:37.324Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61cc41056279987120f2258b',
    },
    address: null,
    uid: 'C8QQHXIG',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2021-12-29T11:05:41.597Z',
    },
    updatedAt: {
      $date: '2021-12-29T11:05:41.597Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61dcf0f76279987120f24157',
    },
    address: null,
    uid: 'me7RXb5T',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2022-01-11T02:52:39.713Z',
    },
    updatedAt: {
      $date: '2022-01-11T02:52:39.713Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61de804fbbcbd4f3c48bf3cc',
    },
    address: null,
    uid: '7Mvbqzz9',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2022-01-12T07:16:31.301Z',
    },
    updatedAt: {
      $date: '2022-01-12T07:16:31.301Z',
    },
    __v: 0,
  },
  {
    _id: {
      $oid: '61e52d2ef77a7ffb39dafb1b',
    },
    address: null,
    uid: 'tsPMqOLm',
    status: 'active',
    tp_amount: 0,
    createdAt: {
      $date: '2022-01-17T08:47:42.991Z',
    },
    updatedAt: {
      $date: '2022-01-17T08:47:42.991Z',
    },
    __v: 0,
  },
];

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
    id: 'uid',
    numeric: false,
    disablePadding: false,
    label: 'UID',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Created at',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
  // {
  //   id: 'weeks',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Weeks',
  // },
  // {
  //   id: 'budget',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Budget',
  // },
];

function EnhancedTableHead(props) {
  const { t } = useTranslation();
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
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {/*{t`${headCell.label}`}*/}
                {t(`${headCell.label}`)}
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

const Transaction = () => {
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.uid);
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
    <PageContainer title="Transaction" description="this is transaction page">
      {/* breadcrumb */}
      <Breadcrumb title={t('Transaction')} subtitle={t('Transaction Information')} />
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
                      // .filter((row) => (searchQuery !== '' ? row.uid === searchQuery : row))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.uid);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row.uid)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.uid}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <CustomCheckbox
                                color="primary"
                                checked={isItemSelected}
                                inputprops={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => handleClick(event, row.uid)}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.uid}
                              </Typography>
                            </TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {new Date(row.createdAt.$date).toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <IconButton>
                                  <RefreshOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                  <AlbumOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                  <DeleteOutlinedIcon />
                                </IconButton>
                              </Box>
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

export default Transaction;
