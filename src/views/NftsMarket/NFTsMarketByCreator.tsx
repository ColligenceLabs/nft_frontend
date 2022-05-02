import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import Container from './components/Container';
import MarketLayout from '../../layouts/market-layout/MarketLayout';
import { CollectionResponse } from './types';
import { useParams } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite';
import CollectionItem from './components/CollectionItem';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface CreatorInfoType {
  full_name: string;
  image: string;
  description: string;
}
const PAGE_SIZE = 20;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NFTsMarketByCreator = () => {
  const { id } = useParams();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const [showAll, setShowAll] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState<CreatorInfoType>({
    full_name: '',
    image: '',
    description: '',
  });

  const { data, size, setSize, mutate, error, isValidating } = useSWRInfinite<CollectionResponse>(
    (index) =>
      `${process.env.REACT_APP_API_SERVER}/admin-api/market/indexs?page=${
        index + 1
      }&perPage=${PAGE_SIZE}&creator_id=${id}`,
    fetcher,
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  // @ts-ignore
  const isEmpty = data?.[0]?.data?.items.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.headers?.x_pages_count <= size);
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (data && data[0] !== null) {
      setCreatorInfo({
        full_name: data[0]?.data?.items[0]?.creator_id?.full_name,
        image: data[0]?.data?.items[0]?.creator_id.image,
        description: data[0]?.data?.items[0]?.creator_id.description,
      });
    }
  }, [data]);

  return (
    <MarketLayout>
      {data && !error && creatorInfo.full_name !== undefined && (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: 1, height: '250px' }}>
              <img
                src={creatorInfo.image}
                alt={creatorInfo.full_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '150px',
                height: '150px',
                marginTop: '-75px',
              }}
            >
              <img
                src={creatorInfo.image}
                alt={creatorInfo.full_name}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '100%',
                }}
              />
            </Box>

            <Box
              sx={{
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                <Typography variant={'h1'} color={'primary'}>
                  {creatorInfo.full_name}
                </Typography>
              </Box>

              <Typography
                sx={{
                  px: 3,
                  textAlign: 'center',
                  background: showAll
                    ? 'none'
                    : `linear-gradient(to bottom, ${theme.palette.text.secondary}, #fff)`,
                  WebkitBackgroundClip: showAll ? 'none' : 'text',
                  WebkitTextFillColor: showAll ? 'none' : 'transparent',
                }}
                variant={'body1'}
                color="text.secondary"
              >
                {showAll
                  ? creatorInfo.description
                  : `${creatorInfo.description.slice(0, smDown ? 150 : 300)}`}
              </Typography>
              <IconButton onClick={() => setShowAll((curr) => !curr)}>
                {showAll ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{ borderBottom: '1px solid', borderColor: `#d9d9d9`, width: '100%', pt: '30px' }}
          />
          <Container>
            <Grid container>
              {!error &&
                data &&
                data.map((result: CollectionResponse) => {
                  return result.data?.items.map((item) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={item._id}>
                      <CollectionItem
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        cover_image={item.image_link}
                        creator_image={item?.creator_id?.image}
                        creator_fullName={item?.creator_id?.full_name}
                      />
                    </Grid>
                  ));
                })}

              {isEmpty && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    border: '1px solid #d6d6d6',
                    borderRadius: '30px',
                    height: '300px',
                    m: '15px',
                  }}
                >
                  <Typography variant={'h2'}>No items to display</Typography>
                </Box>
              )}
              {!error && data?.[size - 1] === undefined && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    border: '1px solid #d6d6d6',
                    borderRadius: '30px',
                    height: '300px',
                    m: '15px',
                  }}
                >
                  <CircularProgress />
                  <Typography sx={{ mt: 2 }} variant={'h4'} color={'primary'}>
                    Loading...
                  </Typography>
                </Box>
              )}
              {!isEmpty && (
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ px: 2 }}>
                  {!(isLoadingMore || isReachingEnd) && (
                    <Button fullWidth variant={'contained'} onClick={() => setSize(size + 1)}>
                      {isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more NFTs' : 'MORE'}
                    </Button>
                  )}
                </Grid>
              )}
            </Grid>
          </Container>
        </>
      )}
    </MarketLayout>
  );
};

export default NFTsMarketByCreator;
