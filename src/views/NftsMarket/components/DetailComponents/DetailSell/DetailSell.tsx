import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CustomTextField from '../../../../../components/forms/custom-elements/CustomTextField';
import { LoadingButton } from '@mui/lab';
import useSWR from 'swr';
import { getUserNftSerialsData } from '../../../../../services/nft.service';
import useActiveWeb3React from '../../../../../hooks/useActiveWeb3React';
import { useLocation, useParams } from 'react-router-dom';
import { nftDetail } from '../../../../../services/market.service';
import useCopyToClipBoard from '../../../../../hooks/useCopyToClipBoard';
import useMediaQuery from '@mui/material/useMediaQuery';
import SectionWrapper from '../SectionWrapper';
import { useKipContract, useKipContractWithKaikas } from '../../../../../hooks/useContract';
import useMarket from '../../../../../hooks/useMarket';

interface DetailSellProps {
  id: string;
}

const DetailSell: React.FC<DetailSellProps> = ({ id }) => {
  const { account, library } = useActiveWeb3React();

  const params = useLocation();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  const { sellNFT } = useMarket();

  const [myNFT, setMyNFT] = useState(null);
  const [myNFTCount, setMyNFTCount] = useState('0');
  const [sellAmount, setSellAmount] = useState('1');
  const [sellPrice, setSellPrice] = useState('0');
  const [totalPrice, setTotalPrice] = useState(0);

  let API_URL;

  // dapp route
  if (params.state === null) {
    API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft/detail/${id}`;
  } else {
    console.log('from talken app');
  }

  const { data, error, mutate } = useSWR(API_URL, () => nftDetail(id));
  const {
    data: myNftData,
    error: myNftError,
    mutate: myNftMutate,
  } = useSWR(`${API_URL}/user-serials?nft_id=${id}&owner_id=${account}`, () =>
    getUserNftSerialsData(id, account),
  );

  // const contractAddress = data?.data?.collection_id?.contract_address;
  // const nftContract = useKipContract(contractAddress, 'KIP17');
  // const nftContractWithKaikas = useKipContractWithKaikas(contractAddress, 'KIP17');

  // const sellTest = async () => {
  //   const tokenId = 1;
  //   const isKaikas =
  //     library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
  //   await sellNFT(isKaikas ? nftContractWithKaikas : nftContract, tokenId, '100');
  // };

  useEffect(() => {
    if (myNftData && myNftData?.data !== null) {
      setMyNFT(myNftData?.data);
      setMyNFTCount(myNftData?.data.length);
    }
  }, [myNftData?.data]);

  useEffect(() => {
    mutate();
  }, [data.data]);

  useEffect(() => {
    setTotalPrice(parseInt(sellAmount) * parseFloat(sellPrice));
  }, [sellAmount, sellPrice]);

  return (
    <>
      {myNFT !== null && (
        <SectionWrapper title={'Sell My NFT'} icon={'tag'}>
          <Box sx={{ pt: 2, px: 2 }}>
            <Typography variant={'subtitle2'} color={'primary'}>
              My NFT Count
            </Typography>
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              gap={'0.5rem'}
            >
              <Typography variant={'h1'}>{myNFTCount}</Typography>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSellPrice(e.target.value)}
                fullWidth
              />
            </Box>
            <Box sx={{ flex: 1, width: smDown ? '50px' : '100px' }}>
              <LoadingButton
                disabled={totalPrice === 0 || isNaN(totalPrice)}
                // loading={buyFlag}
                fullWidth
                variant="contained"
              >
                Sell
              </LoadingButton>
            </Box>
          </Box>

          <Box>
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
        </SectionWrapper>
      )}
    </>
  );
};

export default DetailSell;
