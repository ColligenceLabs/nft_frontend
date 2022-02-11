import React, { useState } from 'react';
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
  FormControlLabel,
  Typography,
  IconButton,
} from '@mui/material';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/EnhancedTableHead';
import { stableSort, getComparator } from '../../utils/tableUtils';
import { headCells } from './tableConfig';
import { rows } from './mockData';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Serials = () => {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalCount, setTotalCount] = useState(0);

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

  const setFilters = async (props) => {
    console.log(props);
    setSearchKeyword(props.searchKeyword);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - rows.length;

  return (
    <PageContainer title="Serials" description="this is Serials page">
      <Breadcrumb title="Serials" subtitle="Serials Information" />
      <Box>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} setFilters={setFilters} />
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
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.no);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.no)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.no}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <CustomCheckbox
                            color="primary"
                            checked={isItemSelected}
                            inputprops={{
                              'aria-labelledby': labelId,
                            }}
                            onClick={(event) => handleClick(event, row.no)}
                          />
                        </TableCell>

                        <TableCell style={{ minWidth: 90 }}>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.no}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.nftName}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 170 }}>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.serialIndex}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 100 }}>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.owner}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.tokenId}
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
                              variant="body1"
                              fontWeight="400"
                              sx={{
                                ml: 1,
                              }}
                            >
                              {row.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          <Typography color="textSecondary" variant="h6" fontWeight="400">
                            {row.createdAt}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          <Typography color="textSecondary" variant="h6">
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
                          </Typography>
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

export default Serials;
