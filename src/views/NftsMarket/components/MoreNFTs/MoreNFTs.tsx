import React, { useEffect } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import useSWR from 'swr';
import { NFTResponse, NFTType } from '../../types';
import NFTItem from '../NFTItem';

interface MoreNFTsProps {
  collection_id: string;
  nft_id: string;
  name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MoreNFTs: React.FC<MoreNFTsProps> = ({ collection_id, name, nft_id }) => {
  const { data, error, mutate } = useSWR<NFTResponse>(
    `${process.env.REACT_APP_API_SERVER}/admin-api/nft/indexsR?onchain=true&onSale=true&collection_id=${collection_id}&nft_id=${nft_id}&type=0&status=active`,
    fetcher,
  );

  useEffect(() => {
    mutate();
  }, [name, mutate]);

  return (
    <Box>
      <Grid container>
        {!error &&
          data &&
          data.data?.items.map((item: NFTType, index) => (
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
