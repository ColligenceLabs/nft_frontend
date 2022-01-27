import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { alpha } from '@mui/material/styles';
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
import { useState } from 'react';

const rows = [
  {
    _id: {
      $oid: '61cadd2a6279987120f2069f',
    },
    status: 'active',
    name: 'DEV',
    description: 'test',
    image:
      'https://nftbedev.talken.io/talkenNft/0xc005facf7de9673a464b5ff5dfce741a3f6e303a/company/1640684842784-talk_symbol01.png',
    contract_id: {
      $oid: '61cacc8ddecb6faa04e7dd41',
    },
    createdAt: {
      $date: '2021-12-28T09:47:22.795Z',
    },
    updatedAt: {
      $date: '2021-12-28T09:47:22.795Z',
    },
  },
  {
    _id: {
      $oid: '61cae0f56279987120f2070a',
    },
    status: 'active',
    name: 'AEYL MUSIC',
    description: '애일뮤직',
    image:
      'https://nftbedev.talken.io/talkenNft/0xc005facf7de9673a464b5ff5dfce741a3f6e303a/company/1640685813972-imgbin-bitcoin-cryptocurrency-computer-icons-bitcoin-s88gnYNpMF09zXNdaggRxQ1i6.jpg',
    contract_id: {
      $oid: '61cacc8ddecb6faa04e7dd41',
    },
    createdAt: {
      $date: '2021-12-28T10:03:33.979Z',
    },
    updatedAt: {
      $date: '2021-12-28T10:03:33.979Z',
    },
  },
  {
    _id: {
      $oid: '61cbc0ca6279987120f21da3',
    },
    status: 'active',
    name: 'KOBEDOT',
    description: 'https://koreabeatbox.com',
    image:
      'https://nftbedev.talken.io/talkenNft/0xc005facf7de9673a464b5ff5dfce741a3f6e303a/company/1640743114169-Contents Provider Symbol.jpg',
    contract_id: {
      $oid: '61cacc8ddecb6faa04e7dd41',
    },
    createdAt: {
      $date: '2021-12-29T01:58:34.173Z',
    },
    updatedAt: {
      $date: '2021-12-29T01:58:34.173Z',
    },
  },
  {
    _id: {
      $oid: '61b6eb2942f5221b36768f6c',
    },
    status: 'active',
    name: 'dev company',
    description: 'test',
    image: 'https://nftbedev.talken.io/talkenNft/company/1639377705758-talk_symbol01.png',
    createdAt: {
      $date: '2021-12-13T06:41:45.764Z',
    },
    updatedAt: {
      $date: '2021-12-13T06:41:45.764Z',
    },
  },
  {
    _id: {
      $oid: '61dceddc6279987120f23fee',
    },
    status: 'active',
    name: 'HSNFT',
    description: '임혁순 바보',
    image:
      'https://nftbedev.talken.io/talkenNft/0xc005facf7de9673a464b5ff5dfce741a3f6e303a/company/1641868764383-aespa-2.jpg',
    contract_id: {
      $oid: '61cacc8ddecb6faa04e7dd41',
    },
    createdAt: {
      $date: '2022-01-11T02:39:24.393Z',
    },
    updatedAt: {
      $date: '2022-01-11T02:39:24.393Z',
    },
  },
  {
    _id: {
      $oid: '61dd03c46279987120f241c3',
    },
    status: 'active',
    name: 'POCKETMON',
    description: '포켓몬스터 모음',
    image:
      'https://nftbedev.talken.io/talkenNft/0xc005facf7de9673a464b5ff5dfce741a3f6e303a/company/1641874372615-images.jpg',
    contract_id: {
      $oid: '61cacc8ddecb6faa04e7dd41',
    },
    createdAt: {
      $date: '2022-01-11T04:12:52.623Z',
    },
    updatedAt: {
      $date: '2022-01-11T04:12:52.623Z',
    },
  },
  {
    _id: {
      $oid: '61de9b76fa8768f97e21ebcb',
    },
    status: 'active',
    name: 'test',
    description: 'test',
    image:
      'https://nftbedev.talken.io/talkenNft/0xc005facf7de9673a464b5ff5dfce741a3f6e303a/company/test.png',
    contract_id: {
      $oid: '61cacc8ddecb6faa04e7dd41',
    },
    createdAt: {
      $date: '2022-01-12T09:12:22.821Z',
    },
    updatedAt: {
      $date: '2022-01-12T09:12:22.821Z',
    },
  },
  {
    _id: {
      $oid: '61de9cebe59d4bfa38ba6725',
    },
    status: 'active',
    name: 'TEST COMPANY',
    description: 'test',
    image:
      'https://nftbedev.talken.io/talkenNft/0xc005facf7de9673a464b5ff5dfce741a3f6e303a/company/TEST COMPANY.jpeg',
    contract_id: {
      $oid: '61cacc8ddecb6faa04e7dd41',
    },
    createdAt: {
      $date: '2022-01-12T09:18:35.440Z',
    },
    updatedAt: {
      $date: '2022-01-12T09:18:35.440Z',
    },
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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
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
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
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

const Creator = () => {
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
    <PageContainer title="Creator" description="this is Creator page">
      {/* breadcrumb */}
      <Breadcrumb title={t('Creator')} subtitle={t('Creator Information')} />
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
                            // onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <CustomCheckbox
                                color="primary"
                                checked={isItemSelected}
                                inputprops={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => handleClick(event, row.name)}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {row.name}
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

export default Creator;
