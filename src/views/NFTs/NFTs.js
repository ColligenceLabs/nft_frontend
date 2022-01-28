import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
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
  Paper,
  IconButton,
  FormControlLabel,
  Typography,
  Chip,
  Switch,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import { rows } from './mockData';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import { headCells } from './tableConfig';

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
            // style={{ width: `${headCell.width}`, background: 'red' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <PageContainer title="NFTs" description="this is NFTs page">
      <Breadcrumb title="NFTs" subtitle="NFTs Information" />
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
                        <TableCell style={{ minWidth: 90 }}>
                          <Typography color="textSecondary" variant="h6">
                            {row.no}
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
                        <TableCell style={{ minWidth: 130 }}>
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
                        <TableCell style={{ minWidth: 130 }}>
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
    </PageContainer>
  );
};

export default NFTs;
