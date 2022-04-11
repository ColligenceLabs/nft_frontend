import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Container from './components/Container';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import klayLogo from '../../assets/images/network_icon/klaytn-klay-logo.png';
// @ts-ignore
import FsLightbox from 'fslightbox-react';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import useMarket from '../../hooks/useMarket';
import { useKipContract, useKipContractWithKaikas } from '../../hooks/useContract';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useSWR from 'swr';
import { nftDetail } from '../../services/market.service';
import { selectTokenId, cancelBuy } from '../../services/nft.service';
import { FAILURE } from '../../config/constants/consts';
import ReactPlayer from 'react-player';
import ImageViewer from '../../components/ImageViewer';

const NFTDetail = () => {
  const { id } = useParams();
  const params = useLocation();
  const [toggler, setToggler] = useState(false);

  let API_URL;

  console.log(params);
  if (params.state === null) {
    console.log('from market page');
    API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft/detail/${id}`;
  } else {
    console.log('from talken app');
  }
  const { data, error } = useSWR(API_URL, () => nftDetail(id));

  const contractAddress = data?.data?.collection_id?.contract_address;
  const { buyNFT, sellNFT, listNFT } = useMarket();
  const { library } = useActiveWeb3React();
  const nftContract = useKipContract(contractAddress, 'KIP17');
  const nftContractWithKaikas = useKipContractWithKaikas(contractAddress, 'KIP17');
  const buy = async () => {
    // 지갑연결 여부 확인 필요.
    const isKaikas =
      library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    // tokenId 를 구해온다.
    const tokenId = await selectTokenId(id);
    console.log('=====>', tokenId, parseInt(tokenId.data, 16));
    const price = data?.data?.price;
    // tokenId 를 사용 구입 진행.
    const result = await buyNFT(
      isKaikas ? nftContractWithKaikas : nftContract,
      parseInt(tokenId.data, 16),
      price,
    );
    // 실패인 경우 원복.
    if (result === FAILURE) await cancelBuy(id, tokenId);
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

  return (
    <MarketLayout>
      {data && !error && (
        <Container>
          <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                <Card onClick={() => setToggler(!toggler)}>
                  <ImageViewer
                    src={data?.data?.metadata?.alt_url}
                    alt={data?.data?.metadata?.name}
                  />
                  {/*<CardMedia*/}
                  {/*  component="img"*/}
                  {/*  image={data?.data?.metadata?.alt_url}*/}
                  {/*  alt={data?.data?.metadata?.name}*/}
                  {/*/>*/}
                </Card>
              )}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box
                sx={{
                  p: 3,
                }}
              >
                <Typography variant={'h4'} color={'primary'}>
                  {data?.data?.collection_id?.name}
                </Typography>
                <Typography variant={'h1'}>{data?.data?.metadata?.name}</Typography>
                <Box display={'flex'} sx={{ mt: 2 }}>
                  <Typography variant={'h4'}>Author by</Typography>
                  <Typography variant={'h4'} color={'primary'} sx={{ ml: 1, fontWeight: 800 }}>
                    {data?.data?.creator_id?.full_name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    border: '0.5px solid gray',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ borderBottom: 0.5, borderColor: 'gray', p: 2 }}>
                    <Typography variant={'h4'}>Information</Typography>
                  </Box>
                  <Box sx={{ p: 2, maxHeight: 200, overflow: 'hidden', overflowY: 'scroll' }}>
                    <Typography variant={'subtitle2'} color={'primary'}>
                      Contract Address
                    </Typography>
                    <Typography variant={'body2'} sx={{ paddingX: 1 }}>
                      <Link to={''} style={{ textDecoration: 'none' }}>
                        {data?.data?.collection_id?.contract_address}
                      </Link>
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
                    border: '0.5px solid gray',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ borderBottom: 0.5, borderColor: 'gray', p: 2 }}>
                    <Box
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      gap={'0.25rem'}
                    >
                      <AccessTimeIcon fontSize={'small'} />
                      <Typography variant={'h4'}>
                        Sale ends {new Date(data?.data?.end_date).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant={'subtitle2'} color={'primary'}>
                      Price
                    </Typography>
                    <Box
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      gap={'0.5rem'}
                    >
                      <img src={klayLogo} alt="klay" height="22px" />
                      <Typography variant={'h1'}>{data?.data?.price} klay</Typography>
                    </Box>

                    {/*<Button variant={'contained'} onClick={sellTest}>*/}
                    {/*  sell*/}
                    {/*</Button>*/}
                    <Button variant={'contained'} onClick={buy}>
                      buy
                    </Button>
                    {/*<Button variant={'contained'} onClick={listTest}>*/}
                    {/*  market*/}
                    {/*</Button>*/}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <FsLightbox toggler={toggler} sources={[data?.data?.metadata?.alt_url]} type="image" />
        </Container>
      )}
    </MarketLayout>
  );
};

export default NFTDetail;
