import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Container from './components/Container';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import klayLogo from '../../assets/images/network_icon/klaytn-klay-logo.png';
import talkLogo from '../../assets/images/logos/talken_icon.png';
// @ts-ignore
import FsLightbox from 'fslightbox-react';
import { Alert, Box, Button, Card, Grid, Snackbar, Typography, useTheme } from '@mui/material';
import useMarket from '../../hooks/useMarket';
import { useKipContract, useKipContractWithKaikas } from '../../hooks/useContract';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useSWR from 'swr';
import { nftDetail } from '../../services/market.service';
import { selectTokenId, cancelBuy, getUserNftSerialsData } from '../../services/nft.service';
import { FAILURE } from '../../config/constants/consts';
import ReactPlayer from 'react-player';
import ImageViewer from '../../components/ImageViewer';
import { LoadingButton } from '@mui/lab';
import MoreNFTs from './components/MoreNFTs';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import useCopyToClipBoard from '../../hooks/useCopyToClipBoard';
import WalletDialog from '../../components/WalletDialog';
import { useWeb3React } from '@web3-react/core';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import ItemActivity from './components/ItemActivity';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

const NFTDetail = () => {
  const theme = useTheme();
  const { copyToClipBoard, copyResult, copyMessage, copyDone, setCopyDone } = useCopyToClipBoard();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  const { id } = useParams();
  const params = useLocation();
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [buyFlag, setBuyFlag] = useState(false);
  const [showMoreItem, setShowMoreItem] = useState(true);
  const [showItemActivity, setShowItemActivity] = useState(true);
  const [myNFT, setMyNFT] = useState(null);
  const [sellPrice, setSellPrice] = useState('0');
  const [totalPrice, setTotalPrice] = useState(0);
  // TODO : KIP37 경우에 구입 수량 입력 받을 값
  const [amount, setAmount] = useState('1');
  const [sellAmount, setSellAmount] = useState('1');

  let API_URL;

  // dapp route
  if (params.state === null) {
    API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft/detail/${id}`;
  } else {
    console.log('from talken app');
  }

  const { data, error, mutate } = useSWR(API_URL, () => nftDetail(id));

  const [sellingQuantity, setSellingQuantity] = useState(0);
  const contractAddress = data?.data?.collection_id?.contract_address;
  const { buyNFT, sellNFT, listNFT } = useMarket();
  const { library, account, activate } = useActiveWeb3React();
  const nftContract = useKipContract(contractAddress, 'KIP17');
  const nftContractWithKaikas = useKipContractWithKaikas(contractAddress, 'KIP17');

  const buy = async () => {
    setBuyFlag(true);
    setSellingQuantity((curr: number) => curr - 1);
    const isKaikas =
      library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    // tokenId 를 구해온다.
    const tokenId = await selectTokenId(id);
    if (tokenId.status === 0) {
      console.log('판매가능한 nft가 존재하지 않습니다.');
      setBuyFlag(false);
      return;
    }
    const price = data?.data?.price;
    const quote = data?.data?.quote;
    const quantity = data?.data?.quantity;
    // tokenId 를 사용 구입 진행.
    // V3 : function buyToken(address _nft, uint256 _tokenId, uint256 _maximumPrice) external;
    // V4 : function buyToken(address _nft, uint256 _tokenId, address _seller, uint256 _quantity, uint256 _maximumPrice, address _quote) external;
    const result = await buyNFT(
      isKaikas ? nftContractWithKaikas : nftContract,
      parseInt(tokenId.data, 16),
      account,
      quantity,
      // TODO : KIP17 = 1, KIP37 = GUI에서 입력 받은 구입할 수량 (구입할 수량은 잔여 수량보다 작아야 함.)
      // quantity_selling이 아마도 팔리면 팔린만큼 증가하는 수이고 촐 판매수량은 quantity 일 듯
      // GUI에서 입력받은 amount + quantity_selling > quantity 이면 GUI에 우류 표시하면 될 듯...
      amount,
      price,
      quote,
    );
    // 실패인 경우 원복.
    console.log('=====>', tokenId, parseInt(tokenId.data, 16));
    if (result === FAILURE) {
      await cancelBuy(id, tokenId.data);
      setSellingQuantity((curr: number) => curr + 1);
    }
    setBuyFlag(false);
  };

  const handleCloseModal = async () => {
    setIsOpenConnectModal(false);
  };
  // const sellTest = async () => {
  //   const tokenId = 1;
  //   const isKaikas =
  //     library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
  //   await sellNFT(isKaikas ? nftContractWithKaikas : nftContract, tokenId, '100');
  // };
  //
  // const listTest = async () => {
  //   await listNFT(contractAddress);
  // };

  useEffect(() => {
    setSellingQuantity(data?.data?.quantity_selling);
  }, [data?.data?.quantity_selling]);

  useEffect(() => {
    getUserNftSerialsData(id, account).then((res) => {
      console.log(res);
      setMyNFT(res.data);
    });
  }, [getUserNftSerialsData, id, account]);

  useEffect(() => {
    setTotalPrice(parseInt(sellAmount) * parseFloat(sellPrice));
  }, [sellPrice, amount]);

  return (
    <MarketLayout>
      {data && !error && (
        <Container>
          <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ p: 2 }}>
              {data?.data?.metadata?.content_Type === 'mp4' ? (
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '600px',
                  }}
                >
                  <ReactPlayer
                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                    url={data?.data?.metadata?.alt_url}
                    width="100%"
                    height="100%"
                    controls={true}
                    light={false}
                    pip={true}
                    playIcon={<button>Play</button>}
                  />
                </Card>
              ) : (
                <Card sx={{ p: 0, m: 0 }} onClick={() => setToggler(!toggler)}>
                  <ImageViewer
                    src={data?.data?.metadata?.alt_url}
                    alt={data?.data?.metadata?.name}
                  />
                </Card>
              )}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box sx={{ p: smDown ? 0 : 2 }}>
                <Box sx={{ p: 1 }}>
                  <Typography
                    component={Link}
                    to={`/market/collection/${data?.data?.collection_id?._id}`}
                    variant={'h4'}
                    color={'primary'}
                    sx={{ textDecoration: 'none' }}
                  >
                    {data?.data?.collection_id?.name}
                  </Typography>

                  <Typography variant={'h1'}>{data?.data?.metadata?.name}</Typography>
                  <Box display={'flex'} sx={{ mt: 2 }}>
                    <Typography variant={'h4'}>Author by</Typography>
                    <Typography variant={'h4'} color={'primary'} sx={{ ml: 1, fontWeight: 800 }}>
                      {data?.data?.creator_id?.full_name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    border: '0.5px solid #d6d6d6',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '0.25rem',
                      borderBottom: 0.5,
                      borderColor: '#d6d6d6',
                      p: 2,
                    }}
                  >
                    <FeatherIcon icon="info" width="20" />
                    <Typography variant={'h4'}>Information</Typography>
                  </Box>
                  <Box sx={{ p: 2, maxHeight: 200, overflow: 'hidden', overflowY: 'scroll' }}>
                    <Typography variant={'subtitle2'} color={'primary'}>
                      Contract Address
                    </Typography>

                    <Typography
                      variant={'body2'}
                      sx={{ cursor: 'pointer', paddingX: 1 }}
                      onClick={() => copyToClipBoard(data?.data?.collection_id?.contract_address)}
                    >
                      {data?.data?.collection_id?.contract_address}
                    </Typography>

                    <Typography variant={'subtitle2'} color={'primary'} sx={{ mt: 1 }}>
                      Description
                    </Typography>
                    <Typography variant={'body2'} sx={{ paddingX: 1 }}>
                      {data?.data?.metadata?.description}
                    </Typography>
                    <Typography variant={'subtitle2'} color={'primary'} sx={{ mt: 1 }}>
                      Created at.
                    </Typography>
                    <Typography variant={'body2'} sx={{ paddingX: 1 }}>
                      {new Date(data?.data?.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    border: '0.5px solid #d6d6d6',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ borderBottom: 0.5, borderColor: '#d6d6d6', p: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <AccessTimeIcon fontSize={'small'} />
                      <Typography variant={'h4'}>
                        Sale ends {new Date(data?.data?.end_date).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pt: 2, px: 2 }}>
                    <Typography variant={'subtitle2'} color={'primary'}>
                      Selling Quantity
                    </Typography>
                    <Box
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      gap={'0.5rem'}
                    >
                      <Typography variant={'h1'}>{sellingQuantity}</Typography>
                    </Box>
                  </Box>

                  {/*buy*/}

                  <Box sx={{ py: 1, px: 2 }}>
                    <Typography variant={'subtitle2'} color={'primary'}>
                      Price
                    </Typography>
                    <Box
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      gap={'0.5rem'}
                    >
                      {data?.data?.quote === 'klay' && (
                        <img src={klayLogo} alt="klay" height="24px" />
                      )}
                      {data?.data?.quote === 'talk' && (
                        <img src={talkLogo} alt="klay" height="24px" />
                      )}
                      <Typography variant={'h1'}>
                        {data?.data?.price} {data?.data?.quote}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flex: 1 }}>
                      {data?.data?.collection_id?.contract_type === 'KIP37' ? (
                        // <Box sx={{ display: 'flex' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                          }}
                        >
                          <Typography variant={'subtitle2'} color={'primary'} sx={{ flex: 1 }}>
                            Amount
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '1rem',

                              flex: 1,
                            }}
                          >
                            <CustomTextField
                              id="amount"
                              name="amount"
                              variant="outlined"
                              type="number"
                              size="small"
                              value={amount}
                              inputProps={{ min: 0 }}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setAmount(e.target.value)
                              }
                              sx={{ flex: 5 }}
                            />

                            {account === undefined ? (
                              <Button
                                variant="contained"
                                onClick={() => setIsOpenConnectModal(true)}
                                sx={{ flex: 1 }}
                              >
                                Connect Wallet
                              </Button>
                            ) : (
                              <Box>
                                <LoadingButton
                                  onClick={buy}
                                  disabled={sellingQuantity === 0}
                                  loading={buyFlag}
                                  variant="contained"
                                  sx={{ flex: 1, width: smDown ? '50px' : '100px' }}
                                >
                                  {sellingQuantity === 0 ? 'Sold out' : 'Buy'}
                                </LoadingButton>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      ) : (
                        <Box>
                          {account === undefined ? (
                            <Button
                              fullWidth
                              variant="contained"
                              onClick={() => setIsOpenConnectModal(true)}
                            >
                              Connect Wallet
                            </Button>
                          ) : (
                            <LoadingButton
                              fullWidth
                              onClick={buy}
                              disabled={sellingQuantity === 0}
                              loading={buyFlag}
                              variant="contained"
                            >
                              {sellingQuantity === 0 ? 'Sold out' : 'Buy'}
                            </LoadingButton>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                {myNFT !== null && (
                  <Box
                    sx={{
                      mt: 2,
                      border: '0.5px solid #d6d6d6',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ borderBottom: 0.5, borderColor: '#d6d6d6', p: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <StorefrontOutlinedIcon fontSize={'small'} />
                        <Typography variant={'h4'}>Sell My NFT</Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        py: 1,
                        px: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        gap: '1rem',
                      }}
                    >
                      {data?.data?.collection_id?.contract_type === 'KIP37' && (
                        <Box sx={{ flex: 2 }}>
                          <Typography variant={'subtitle2'} color={'primary'}>
                            Amount
                          </Typography>

                          <CustomTextField
                            id="amount"
                            name="amount"
                            variant="outlined"
                            type="number"
                            size="small"
                            value={sellAmount}
                            inputProps={{ min: 0 }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setSellAmount(e.target.value)
                            }
                            fullWidth
                          />
                        </Box>
                      )}
                      <Box sx={{ flex: 2 }}>
                        <Typography variant={'subtitle2'} color={'primary'}>
                          {`Unit Price (${data?.data?.quote.toUpperCase()})`}
                        </Typography>

                        <CustomTextField
                          id="price"
                          name="price"
                          variant="outlined"
                          type="number"
                          size="small"
                          value={sellPrice}
                          inputProps={{ min: 0 }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSellPrice(e.target.value)
                          }
                          fullWidth
                        />
                      </Box>
                      <Box sx={{ flex: 1, width: smDown ? '50px' : '100px' }}>
                        <LoadingButton
                          // onClick={buy}
                          // disabled={sellingQuantity === 0}
                          // loading={buyFlag}
                          fullWidth
                          variant="contained"
                        >
                          Sell
                        </LoadingButton>
                      </Box>
                    </Box>

                    {data?.data?.collection_id?.contract_type === 'KIP37' &&
                      !isNaN(totalPrice) &&
                      totalPrice !== 0 && (
                        <Box
                          sx={{
                            px: 2.5,
                            pb: 2,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'bottom',
                            gap: '0.5rem',
                          }}
                        >
                          <Typography variant={'subtitle2'}>Total : </Typography>
                          <Typography variant={'subtitle2'} color={'primary'}>
                            {totalPrice.toFixed(4)}
                          </Typography>
                          <Typography variant={'subtitle2'} color={'primary'}>
                            {data?.data?.quote.toUpperCase()}
                          </Typography>
                        </Box>
                      )}
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 2 }}>
              <Box>
                <Box
                  sx={{
                    mt: 2,
                    border: '0.5px solid #d6d6d6',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      borderBottom: showMoreItem ? 0.5 : 0,
                      borderColor: '#d6d6d6',
                      p: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '0.2rem',
                      }}
                    >
                      <HistoryOutlinedIcon />
                      <Typography variant={'h4'}>Item Activity</Typography>
                    </Box>
                    <KeyboardArrowUpIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setShowItemActivity((cur) => !cur)}
                    />
                  </Box>
                  {showItemActivity && <ItemActivity />}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 2 }}>
              <Box>
                <Box
                  sx={{
                    border: '0.5px solid #d6d6d6',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      borderBottom: showMoreItem ? 0.5 : 0,
                      borderColor: '#d6d6d6',
                      p: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '0.2rem',
                      }}
                    >
                      <AppsIcon />
                      <Typography variant={'h4'}>More From This Collection</Typography>
                    </Box>
                    <KeyboardArrowUpIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setShowMoreItem((cur) => !cur)}
                    />
                  </Box>
                  {showMoreItem && (
                    <>
                      <Box
                        sx={{
                          p: smDown ? 0 : 2,
                          overflow: 'hidden',
                          overflowY: 'scroll',
                          backgroundColor: '#f0faf5',
                        }}
                      >
                        <MoreNFTs
                          nft_id={id!}
                          collection_id={data?.data?.collection_id._id}
                          name={data?.data?.metadata?.name}
                        />
                      </Box>
                      <Box
                        sx={{ borderTop: 0.5, borderColor: '#d6d6d6', p: 2, textAlign: 'center' }}
                      >
                        <Button
                          component={Link}
                          to={`/market/collection/${data?.data?.collection_id?._id}`}
                          variant={'outlined'}
                        >
                          View NFTs in this Collection
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <FsLightbox toggler={toggler} sources={[data?.data?.metadata?.alt_url]} type="image" />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={copyDone}
            autoHideDuration={2000}
            onClose={() => {
              setCopyDone(false);
            }}
          >
            <Alert
              variant="filled"
              severity={copyResult ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {copyMessage}
            </Alert>
          </Snackbar>
          <WalletDialog
            isOpenConnectModal={isOpenConnectModal}
            handleCloseModal={handleCloseModal}
            activate={activate}
          />
        </Container>
      )}
    </MarketLayout>
  );
};

export default NFTDetail;
