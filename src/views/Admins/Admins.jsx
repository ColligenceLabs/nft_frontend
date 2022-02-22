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
  Switch,
} from '@mui/material';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import StatusDialog from '../../components/StatusDialog';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/EnhancedTableHead';
import { headCells } from './tableConfig';
import { stableSort, getComparator } from '../../utils/tableUtils';
import { getAdminsData, updateAdminsStatus } from '../../services/admins.service';
import AdminsDetailModal from './AdminsDetailModal';

const Admins = () => {
  const { t } = useTranslation();

  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [adminDetailModal, setAdminDetailModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [statusOpen, setStatusOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchLevel, setSearchLevel] = useState('');

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

  const handleUserDetailModal = (row) => {
    setSelectedAdmin(row);
    setAdminDetailModal(true);
  };

  const closeUserDetailModal = () => {
    setAdminDetailModal(false);
  };

  const handleStatusOpen = (row) => {
    setSelectedAdmin(row);
    setStatusOpen(true);
  };

  const handleStatusClose = () => {
    setStatusOpen(false);
  };

  const setFilters = async (props) => {
    setSearchName(props.full_name);
    setSearchEmail(props.email);
    setSearchLevel(props.level);
  };

  const updateStatus = async (id, status) => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    await updateAdminsStatus(id, newStatus).then((res) => {
      if (res.status === 1) {
        setRows(rows.map((row) => (row._id === id ? { ...row, status: newStatus } : row)));
      }
    });
    setStatusOpen(false);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;
  const emptyRows = rowsPerPage - rows.length;

  useEffect(() => {
    const fetchAdmins = async () => {
      await getAdminsData(page, rowsPerPage, searchName, searchEmail, searchLevel).then(
        ({ data }) => {
          setRows(data.items);
          setTotalCount(data.headers.x_total_count);
        },
      );
    };
    fetchAdmins();
  }, [getAdminsData, page, rowsPerPage, searchName, searchEmail, searchLevel]);

  return (
    <PageContainer title="Admins" description="this is admins page">
      <Breadcrumb title="Admins" subtitle={t('Admins Information')} />
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
                          {row.description}
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
                            <Switch
                              onClick={() => handleStatusOpen(row)}
                              checked={row.status === 'active'}
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
                            <IconButton onClick={() => handleUserDetailModal(row)}>
                              <AlbumOutlinedIcon />
                            </IconButton>
                            {/*<IconButton>*/}
                            {/*  <DeleteOutlinedIcon />*/}
                            {/*</IconButton>*/}
                          </Box>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/*{emptyRows > 0 && (*/}
                {/*  <TableRow*/}
                {/*    style={{*/}
                {/*      height: (dense ? 53 : 73) * emptyRows,*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    <TableCell colSpan={6} />*/}
                {/*  </TableRow>*/}
                {/*)}*/}
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
        row={selectedAdmin}
      />
      <StatusDialog
        open={statusOpen}
        handleStatusClose={handleStatusClose}
        updateStatus={() => updateStatus(selectedAdmin._id, selectedAdmin.status)}
      />
    </PageContainer>
  );
};

export default Admins;
