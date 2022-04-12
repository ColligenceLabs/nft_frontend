import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { NFTResponse } from '../../types';
import NFTItem from '../NFTItem';

interface MoreNFTsProps {
  collection_id: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MoreNFTs: React.FC<MoreNFTsProps> = ({ collection_id }) => {
  const { data, error } = useSWR<NFTResponse>(
    `${process.env.REACT_APP_API_SERVER}/admin-api/nft/indexs?page=1&perPage=4&onchain=true&collection_id=${collection_id}&type=0`,
    fetcher,
  );
  console.log(data);
  return (
    <Box>
      <Grid container>
        {!error &&
          data &&
          data.data?.items.map((item, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
              <NFTItem item={item} />
            </Grid>
          ))}

        {!error && data === undefined && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
              border: '1px solid #d6d6d6',
              borderRadius: '30px',
              height: '100vh',
              m: '15px',
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2 }} variant={'h4'} color={'primary'}>
              Loading...
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default MoreNFTs;
