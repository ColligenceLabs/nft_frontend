import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from './components/Container';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import klayLogo from '../../assets/images/network_icon/klaytn-klay-logo.png';
// @ts-ignore
import FsLightbox from 'fslightbox-react';
import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import useMarket from '../../hooks/useMarket';
import { useKipContract, useKipContractWithKaikas } from '../../hooks/useContract';
import { getUserNFTs, nftDetail } from '../../services/nft.service';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useSWR from 'swr';

const NFTDetail = () => {
  const { id } = useParams();
  const [toggler, setToggler] = useState(false);
  const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft/detail/${id}`;
  const { data, error } = useSWR(API_URL, () => nftDetail(id));

  const contractAddress = '0xe1c53ab564de73c181df56aa350677297b857662';
  const { buyNFT, sellNFT, listNFT } = useMarket();
  const { library, account } = useActiveWeb3React();
  const nftContract = useKipContract(contractAddress, 'KIP17');
  const nftContractWithKaikas = useKipContractWithKaikas(contractAddress, 'KIP17');
  const buyTest = async () => {
    const tokenId = 1;
    const isKaikas =
      library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    await buyNFT(isKaikas ? nftContractWithKaikas : nftContract, tokenId, '100');
  };

  const sellTest = async () => {
    const tokenId = 1;
    const isKaikas =
      library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    await sellNFT(isKaikas ? nftContractWithKaikas : nftContract, tokenId, '100');
  };

  const listTest = async () => {
    await listNFT(contractAddress);
  };

  const userNFTs = async () => {
    const nfts = await getUserNFTs(account, 100);
  };

  return (
    <MarketLayout>
      {data && !error && (
        <Container>
          <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card onClick={() => setToggler(!toggler)}>
                <CardMedia
                  component={'img'}
                  image={data?.data?.metadata?.image}
                  alt={data?.data?.metadata?.name}
                />
              </Card>
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

                    <Button variant={'contained'} onClick={userNFTs}>
                      userNFTs
                    </Button>
                    <Button variant={'contained'} onClick={sellTest}>
                      sell
                    </Button>
                    <Button variant={'contained'} onClick={buyTest}>
                      buy
                    </Button>
                    <Button variant={'contained'} onClick={listTest}>
                      market
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <FsLightbox toggler={toggler} sources={[data?.data?.metadata?.image]} type="image" />
        </Container>
      )}
    </MarketLayout>
  );
};

export default NFTDetail;
