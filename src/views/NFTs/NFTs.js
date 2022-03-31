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
  Alert,
  Snackbar,
} from '@mui/material';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/EnhancedTableHead';
import { stableSort, getComparator } from '../../utils/tableUtils';
import { headCells } from './tableConfig';
import { deleteNft, getNFTData } from '../../services/nft.service';
import { useSelector } from 'react-redux';
import ScheduleDialog from './ScheduleDialog';
import DeleteDialog from '../../components/DeleteDialog';
import TransferDialog from '../../components/TransferDialog/TransferDialog';
import NFTsDetailModal from './NFTsDetailModal';
import splitAddress from '../../utils/splitAddress';
import useCopyToClipBoard from '../../hooks/useCopyToClipBoard';

const NFTs = () => {
  const { t } = useTranslation();

  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState({});
  const [deleteInAction, setDeleteInAction] = useState(false);
  const [finishDelete, setFinishDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const {
    user: {
      infor: { level, id },
    },
  } = useSelector((state) => state.auth);
  const { copyToClipBoard, copyResult, copyMessage, copyDone, setCopyDone } = useCopyToClipBoard();

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

  const setFilters = async (props) => {
    setSearchKeyword(props.searchKeyword);
    setCollectionId(props.collectionId);
  };

  const onDelete = async (multiFlag = true) => {
    let deleteNfts = [];

    if (deleteInAction) {
      deleteNfts = deleteNfts.concat(selectedNft._id);
    } else {
      deleteNfts = selected;
    }
    const res = await deleteNft(deleteNfts);
    if (res.data.status === 0) {
      setDeleteMessage(res.data.message);
    }
    setOpenDeleteModal(false);
    setDeleteInAction(false);
    setFinishDelete(true);

    await fetchNFTs();
  };

  const openSchedule = () => {
    setOpenScheduleModal(true);
  };

  const handleCloseModal = () => {
    setOpenScheduleModal(false);
    fetchNFTs();
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const openDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  const handleSendModal = (row) => {
    setSelectedNft(row);
    setSendModal(true);
  };

  const handleCloseSendModal = async () => {
    setSendModal(false);
    await fetchNFTs();
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - rows.length;

  const fetchNFTs = async () => {
    await getNFTData(
      0,
      page,
      rowsPerPage,
      searchKeyword,
      collectionId,
      level.toLowerCase() === 'creator' ? id : undefined,
    )
      .then(({ data }) => {
        setRows(data.items);
        setTotalCount(data.headers.x_total_count);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNFTs();
  }, [getNFTData, page, rowsPerPage, searchKeyword, collectionId]);

  return (
    <PageContainer title="NFTs" description="this is NFTs page">
      <Breadcrumb title="NFTs" subtitle="NFTs Information" />
      <Box>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            setFilters={setFilters}
            onDelete={openDelete}
            openSchedule={openSchedule}
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
                      <TableCell
                        sx={{ cursor: 'pointer' }}
                        onClick={() => copyToClipBoard(row.collection_id?.contract_address)}
                      >
                        <Typography color="textSecondary" variant="h6">
                          {/* TODO : collection_id 가 null 인 경우 발생 원인 확인 필요. */}
                          {splitAddress(row.collection_id?.contract_address ?? '')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.metadata.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.description.length > 20
                            ? `${row.description.slice(0, 20)}...`
                            : row.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                          {row.collection_id?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {row.selling ? (
                          <Chip
                            label="On sale"
                            color="primary"
                            size={'small'}
                            style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                          />
                        ) : (
                          <Chip
                            label="Off sale"
                            color={'error'}
                            size={'small'}
                            style={{ margin: '0.5px 0px', fontSize: '10px', height: '18px' }}
                          />
                        )}
                        <Chip
                          label={`Total Mint : ${row.quantity}`}
                          color={'warning'}
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
                          color={'secondary'}
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
                        <IconButton
                          size={'small'}
                          disabled={row.quantity_selling === row.transfered}
                          onClick={() => handleSendModal(row)}
                        >
                          <SendOutlinedIcon />
                        </IconButton>
                        <IconButton
                          size={'small'}
                          onClick={() => {
                            setSelectedNft(row);
                            setOpenDetailModal(true);
                          }}
                        >
                          <AlbumOutlinedIcon />
                        </IconButton>
                        <IconButton
                          size={'small'}
                          onClick={() => {
                            setSelectedNft(row);
                            setDeleteInAction(true);
                            openDelete();
                          }}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                        {/*</Box>*/}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/*{emptyRows > 0 && (*/}
                {/*  <TableRow*/}
                {/*    style={{*/}
                {/*      height: (dense ? 33 : 53) * emptyRows,*/}
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
      <ScheduleDialog
        open={openScheduleModal}
        handleCloseModal={handleCloseModal}
        selected={selected}
      />
      <DeleteDialog
        title="NFT 삭제"
        open={openDeleteModal}
        handleDeleteClose={handleDeleteClose}
        doDelete={onDelete}
      />
      <TransferDialog
        open={sendModal}
        handleCloseModal={handleCloseSendModal}
        item={selectedNft}
        type={selectedNft.collection_id?.contract_type}
      />
      <NFTsDetailModal
        open={openDetailModal}
        handleCloseDetailModal={handleCloseDetailModal}
        row={selectedNft}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={finishDelete}
        autoHideDuration={2000}
        onClose={() => {
          setFinishDelete(false);
        }}
      >
        <Alert
          variant="filled"
          severity={deleteMessage === null ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {deleteMessage === null ? t('Success delete NFTs.') : t(`${deleteMessage}`)}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={copyDone}
        autoHideDuration={2000}
        onClose={() => {
          setCopyDone(false);
        }}
      >
        <Alert variant="filled" severity={copyResult ? 'success' : 'error'} sx={{ width: '100%' }}>
          {copyMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default NFTs;
