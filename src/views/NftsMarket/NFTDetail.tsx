import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './components/Container';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import klayLogo from '../../assets/images/network_icon/klaytn-klay-logo.png';
// @ts-ignore
import FsLightbox from 'fslightbox-react';
import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import useMarket from '../../hooks/useMarket';
import { useKipContract, useKipContractWithKaikas } from '../../hooks/useContract';
import { getUserNFTs, sellNFTsBatch } from '../../services/nft.service';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';

const mock = {
  id: 0,
  image: 'http://www.gcilbo.kr/news/photo/201712/5564_4708_1133.png',
  description:
    'Pigments is an exploration of colour and spatial distortion. Each instance is an abstract representation aimed at evoking a micro or macro-environment; from unknown substances, or oil in a canvas, to nebular formations. The pieces are animated, meant to be experienced live. The piece can run endlessly, with infinite output. To run it smoothly you need a capable GPU. If this proves to be too computationally intensive, or if you prefer a static view, feel free to press the spacebar.',
  name: 'Pigments #569,',
  title: 'Pigments by Darien Brito',
  saleEnd: '21, 2022 at 8:46pm KST',
  author: 'helloljho',
  contract: '0xBDbc1D0E5aa36a8b4c48dD2D8F1a653f8650Da72',
  chain: 'Klaytn',
  category: 'Game',
  createdAt: '2022/02/03',
  price: 200,
};

const NFTDetail = () => {
  const [toggler, setToggler] = useState(false);

  // const contractAddress = '0xe1c53ab564de73c181df56aa350677297b857662';
  const contractAddress = '0x464b60257a0e6c77b1cc2515c86593daa83e665e';
  const { buyNFT, sellNFT, listNFT } = useMarket();
  const { library, account } = useActiveWeb3React();
  const nftContract = useKipContract(contractAddress, 'KIP17');
  const nftContractWithKaikas = useKipContractWithKaikas(contractAddress, 'KIP17');
  const buyTest = async () => {
    const tokenId = 1;
    const isKaikas = library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    await buyNFT(isKaikas ? nftContractWithKaikas : nftContract, tokenId, '100');
  }

  const sellTest = async () => {
    const tokenId = 1;
    const isKaikas = library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    await sellNFT(isKaikas ? nftContractWithKaikas : nftContract, tokenId, '100');
  }

  const listTest = async () => {
    await listNFT(contractAddress);
  }

  const userNFTs = async () => {
    const nfts = await getUserNFTs(account, 100);
    console.log(nfts);
  }

  const sellNFTs = async () => {
    const nft_id = '623d7d5f0058e509f6bb03a3';
    const result = await sellNFTsBatch(nft_id);
    console.log(result);
  }

  return (
    <MarketLayout>
      <Container>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card onClick={() => setToggler(!toggler)}>
              <CardMedia component={'img'} image={mock.image} alt={mock.name} />
            </Card>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              sx={{
                p: 3,
              }}
            >
              <Typography variant={'h4'} color={'primary'}>
                {mock.title}
              </Typography>
              <Typography variant={'h1'}>{mock.name}</Typography>
              <Box display={'flex'} sx={{ mt: 2 }}>
                <Typography variant={'h4'}>Author by</Typography>
                <Typography variant={'h4'} color={'primary'} sx={{ ml: 1, fontWeight: 800 }}>
                  {mock.author}
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
                      {mock.contract}
                    </Link>
                  </Typography>
                  <Typography variant={'subtitle2'} color={'primary'} sx={{ mt: 1 }}>
                    Description
                  </Typography>
                  <Typography variant={'body2'} sx={{ paddingX: 1 }}>
                    {mock.description}
                  </Typography>
                  <Typography variant={'subtitle2'} color={'primary'} sx={{ mt: 1 }}>
                    Created at.
                  </Typography>
                  <Typography variant={'body2'} sx={{ paddingX: 1 }}>
                    {mock.createdAt}
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
                    <Typography variant={'h4'}>Sale ends March 21, 2022 at 9:03px</Typography>
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
                    <Typography variant={'h1'}>{mock.price} klay</Typography>
                  </Box>

                  <Button variant={'contained'} onClick={userNFTs}>userNFTs</Button>
                  <Button variant={'contained'} onClick={sellTest}>sell</Button>
                  <Button variant={'contained'} onClick={buyTest}>buy</Button>
                  <Button variant={'contained'} onClick={listTest}>market</Button>
                  <Button variant={'contained'} onClick={sellNFTs}>sellBatch</Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <FsLightbox toggler={toggler} sources={[mock.image]} type="image" />
      </Container>
    </MarketLayout>
  );
};

export default NFTDetail;
