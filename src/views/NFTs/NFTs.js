import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  FormControlLabel,
  Typography,
  Chip,
  Switch,
} from '@mui/material';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/EnhancedTableHead';
import { stableSort, getComparator } from '../../utils/tableUtils';
import { headCells } from './tableConfig';
import { getNFTData } from '../../services/nft.service';

const NFTs = () => {
  const { t } = useTranslation();

  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [totalCount, setTotalCount] = useState(0);
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
  const emptyRows = rowsPerPage - rows.length;

  useEffect(() => {
    const fetchNFTs = async () => {
      await getNFTData(page, rowsPerPage).then(({ data }) => {
        setRows(data.items);
        setTotalCount(data.headers.x_total_count);
      });
    };
    fetchNFTs();
  }, [getNFTData, page, rowsPerPage]);

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
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <CustomCheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputprops={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={(event) => handleClick(event, row._id)}
                        />
                      </TableCell>
                      {/*<TableCell style={{ minWidth: 90 }}>*/}
                      {/*  <Typography color="textSecondary" variant="h6">*/}
                      {/*    {row.no}*/}
                      {/*  </Typography>*/}
                      {/*</TableCell>*/}
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row._id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.metadata.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.collection_id?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {row.selling_status === 1 ? (
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
                          label={`Total Mint : ${row.quantity}`}
                          color={'error'}
                          size={'small'}
                          style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                        />
                        <Chip
                          label={`Selling Quantity : ${row.quantity_selling}`}
                          color={'success'}
                          size={'small'}
                          style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                        />
                        <Chip
                          label={`Prices : ${row.price}`}
                          color={'warning'}
                          size={'small'}
                          style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                        />
                      </TableCell>
                      <TableCell style={{ minWidth: 130 }}>
                        <Typography color="textSecondary" variant="h6">
                          {row.creator_id?.full_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              backgroundColor:
                                row.status === 'active'
                                  ? (theme) => theme.palette.success.main
                                  : row.status === 'inactive'
                                  ? (theme) => theme.palette.warning.main
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
                      <TableCell style={{ minWidth: 130 }}>
                        <Switch
                          checked={row.selling}
                          // onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        <Chip
                          label={new Date(row.start_date).toLocaleString()}
                          color={'success'}
                          size={'small'}
                          style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                        />
                        <Chip
                          label={new Date(row.end_date).toLocaleString()}
                          color={'error'}
                          size={'small'}
                          style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                        />
                      </TableCell>
                      <TableCell style={{ minWidth: 200 }}>
                        <Typography color="textSecondary" variant="h6">
                          {new Date(row.createdAt).toLocaleString()}
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
            count={totalCount}
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
