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
} from '@mui/material';

import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/EnhancedTableHead';
import { headCells } from './tableConfig';
import { stableSort, getComparator } from '../../utils/tableUtils';
import { getAdminsData } from '../../services/admins.service';
import AdminsDetailModal from './AdminsDetailModal';

const Admins = () => {
  const { t } = useTranslation();

  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminDetailModal, setAdminDetailModal] = useState(false);
  const [selectedAdminDetail, setSelectedAdminDetail] = useState({});

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
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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

  const handleUserDetailModal = (row) => {
    setSelectedAdminDetail(row);
    setAdminDetailModal(true);
  };

  const closeUserDetailModal = () => {
    setAdminDetailModal(false);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  const emptyRows = rowsPerPage - rows.length;

  useEffect(() => {
    const fetchAdmins = async () => {
      await getAdminsData(page, rowsPerPage).then(({ data }) => {
        setRows(data.items);
        setTotalCount(data.headers.x_total_count);
      });
    };
    fetchAdmins();
  }, [getAdminsData, page, rowsPerPage]);

  return (
    <PageContainer title="Admins" description="this is admins page">
      <Breadcrumb title="Admins" subtitle={t('Admins Information')} />
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
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.full_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.level}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
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
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          <Box>
                            <IconButton>
                              <RefreshOutlinedIcon />
                            </IconButton>
                            <IconButton onClick={() => handleUserDetailModal(row)}>
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
                      height: (dense ? 53 : 73) * emptyRows,
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
      <AdminsDetailModal
        open={adminDetailModal}
        closeUserDetailModal={closeUserDetailModal}
        row={selectedAdminDetail}
      />
    </PageContainer>
  );
};

export default Admins;
