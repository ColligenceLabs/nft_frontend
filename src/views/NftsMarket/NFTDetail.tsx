import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Container from './components/Container';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
// @ts-ignore
import FsLightbox from 'fslightbox-react';
import { Box, useTheme } from '@mui/material';
import useSWR from 'swr';
import { nftDetail } from '../../services/market.service';
import MoreNFTs from './components/MoreNFTs';
import useMediaQuery from '@mui/material/useMediaQuery';
// @ts-ignore
import FeatherIcon from 'feather-icons-react';
import ItemActivity from './components/ItemActivity';
import Listings from './components/Listings';
import DetailContents from './components/DetailComponents/DetailContents';
import DetailTitle from './components/DetailComponents/DetailTitle';
import DetailInformation from './components/DetailComponents/DetailInformation';
import DetailBuy from './components/DetailComponents/DetailBuy';
import DetailSell from './components/DetailComponents/DetailSell';

const NFTDetail = () => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  });

  const { id } = useParams();
  const params = useLocation();

  let API_URL;

  // dapp route
  if (params.state === null) {
    API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft/detail/${id}`;
  } else {
    console.log('from talken app');
  }

  const { data, error } = useSWR(API_URL, () => nftDetail(id));

  return (
    <MarketLayout>
      {data && !error && (
        <Container>
          {mdDown ? (
            <Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DetailTitle
                  _id={data?.data?.collection_id?._id}
                  name={data?.data?.collection_id?.name}
                  full_name={data?.data?.collection_id?.full_name}
                />
                <DetailContents
                  content_Type={data?.data?.metadata?.content_Type}
                  alt_url={data?.data?.metadata?.alt_url}
                  name={data?.data?.metadata?.name}
                />
                <DetailInformation nft={data?.data} collection={data?.data?.collection_id} />
                <DetailBuy id={id!} />
                <Listings />
                <DetailSell id={id!} />
              </Box>

              <ItemActivity />
              <MoreNFTs
                nft_id={id!}
                collection_id={data?.data?.collection_id._id}
                name={data?.data?.metadata?.name}
              />
            </Box>
          ) : (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <DetailContents
                    content_Type={data?.data?.metadata?.content_Type}
                    alt_url={data?.data?.metadata?.alt_url}
                    name={data?.data?.metadata?.name}
                  />
                  <DetailInformation nft={data?.data} collection={data?.data?.collection_id} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1.2 }}>
                  <DetailTitle
                    _id={data?.data?.collection_id?._id}
                    name={data?.data?.collection_id?.name}
                    full_name={data?.data?.collection_id?.full_name}
                  />
                  <DetailBuy id={id!} />
                  <Listings />
                  <DetailSell id={id!} />
                </Box>
              </Box>
              <ItemActivity />
              <MoreNFTs
                nft_id={id!}
                collection_id={data?.data?.collection_id._id}
                name={data?.data?.metadata?.name}
              />
            </Box>
          )}
        </Container>
      )}
    </MarketLayout>
  );
};

export default NFTDetail;
