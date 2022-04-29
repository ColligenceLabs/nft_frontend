import React, { useEffect, useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { Box, Button, Typography, useTheme } from '@mui/material';
import klayLogo from '../../../../../assets/images/network_icon/klaytn-klay-logo.png';
import talkLogo from '../../../../../assets/images/logos/talken_icon.png';
import CustomTextField from '../../../../../components/forms/custom-elements/CustomTextField';
import { LoadingButton } from '@mui/lab';
import {
  cancelBuy,
  getUserNftSerialsData,
  selectSerials,
} from '../../../../../services/nft.service';
import useActiveWeb3React from '../../../../../hooks/useActiveWeb3React';
import useMarket from '../../../../../hooks/useMarket';
import { useKipContract, useKipContractWithKaikas } from '../../../../../hooks/useContract';
import useSWR from 'swr';
import { nftDetail } from '../../../../../services/market.service';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';
import WalletDialog from '../../../../../components/WalletDialog';

interface DetailBuyProps {
  id: string;
}

const DetailBuy: React.FC<DetailBuyProps> = ({ id }) => {
  const theme = useTheme();
  const { library, account, activate } = useActiveWeb3React();
  const { buyNFT, sellNFT, listNFT } = useMarket();
  const params = useLocation();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  // dapp route
  let API_URL;
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

  const contractAddress = data?.data?.collection_id?.contract_address;
  const nftContract = useKipContract(contractAddress, 'KIP17');
  const nftContractWithKaikas = useKipContractWithKaikas(contractAddress, 'KIP17');

  const [sellingQuantity, setSellingQuantity] = useState(0);
  const [buyFlag, setBuyFlag] = useState(false);
  const [amount, setAmount] = useState('1');
  const [isOpenConnectModal, setIsOpenConnectModal] = useState(false);

  const buy = async () => {
    setBuyFlag(true);
    setSellingQuantity((curr: number) => curr - parseInt(amount));
    const isKaikas =
      library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    // tokenId 를 구해온다.
    const serials = await selectSerials(id, account, amount);

    if (serials.status === 0) {
      console.log('판매가능한 nft가 존재하지 않습니다.');
      setBuyFlag(false);
      return;
    }
    try {
      const price = data?.data?.price;
      const quote = data?.data?.quote;
      const quantity = data?.data?.sell_amount;
      const seller = serials.data[0].seller;
      // tokenId 를 사용 구입 진행.
      // V3 : function buyToken(address _nft, uint256 _tokenId, uint256 _maximumPrice) external;
      // V4 : function buyToken(address _nft, uint256 _tokenId, address _seller, uint256 _quantity, uint256 _maximumPrice, address _quote) external;
      const result = await buyNFT(
        isKaikas ? nftContractWithKaikas : nftContract,
        parseInt(serials.data[0].token_id, 16),
        seller,
        quantity,
        // TODO : KIP17 = 1, KIP37 = GUI에서 입력 받은 구입할 수량 (구입할 수량은 잔여 수량보다 작아야 함.)
        // quantity_selling이 아마도 팔리면 팔린만큼 증가하는 수이고 촐 판매수량은 quantity 일 듯
        // GUI에서 입력받은 amount + quantity_selling > quantity 이면 GUI에 우류 표시하면 될 듯...
        amount,
        price,
        quote,
      );
    } catch (e) {
      // 실패인 경우 원복.
      console.log('=====>', serials.data, parseInt(serials.data[0].token_id, 16));
      await cancelBuy(id, serials.data[0].token_id, account);
      setSellingQuantity((curr: number) => curr + parseInt(amount));
    }
    await mutate();
    await myNftMutate();
    setBuyFlag(false);
  };

  const handleCloseModal = async () => {
    setIsOpenConnectModal(false);
  };

  useEffect(() => {
    setSellingQuantity(data?.data?.quantity_selling);
    myNftMutate();
  }, [data?.data?.quantity_selling]);

  return (
    <SectionWrapper
      title={`Sale ends ${new Date(data?.data?.end_date).toLocaleString()}`}
      icon={'info'}
    >
      <Box sx={{ pt: 2, px: 2 }}>
        <Typography variant={'subtitle2'} color={'primary'}>
          Selling Quantity
        </Typography>
        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={'0.5rem'}>
          <Typography variant={'h1'}>{sellingQuantity}</Typography>
        </Box>
      </Box>
      <Box sx={{ py: 1, px: 2 }}>
        <Typography variant={'subtitle2'} color={'primary'}>
          Price
        </Typography>
        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={'0.5rem'}>
          {data?.data?.quote === 'klay' && <img src={klayLogo} alt="klay" height="24px" />}
          {data?.data?.quote === 'talk' && <img src={talkLogo} alt="klay" height="24px" />}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
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
            <Box sx={{ flex: 1 }}>
              {account === undefined ? (
                <Button fullWidth variant="contained" onClick={() => setIsOpenConnectModal(true)}>
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
      <WalletDialog
        isOpenConnectModal={isOpenConnectModal}
        handleCloseModal={handleCloseModal}
        activate={activate}
      />
    </SectionWrapper>
  );
};

export default DetailBuy;
