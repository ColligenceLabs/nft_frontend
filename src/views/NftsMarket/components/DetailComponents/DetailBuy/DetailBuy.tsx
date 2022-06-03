import React, { useEffect, useState } from 'react';
import SectionWrapper from '../SectionWrapper';
import { Box, Button, Snackbar, Typography, useTheme } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import klayLogo from '../../../../../assets/images/network_icon/klaytn-klay-logo.png';
import talkLogo from '../../../../../assets/images/logos/talken_icon.png';
import bnbLogo from '../../../../../assets/images/network_icon/binance-bnb-logo.png';

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
import SellingClock from '../SellingClock';
import getNftPrice from '../../../../../utils/getNftPrice';
import { useSelector } from 'react-redux';
import WalletConnectorDialog from '../../../../../components/WalletConnectorDialog';
import { getChainId } from '../../../../../utils/commonUtils';
import sliceFloatNumber from '../../../../../utils/sliceFloatNumber';

interface DetailBuyProps {
  id: string;
  setItemActivityMutateHandler: (b: boolean) => void;
  itemActivityMutateHandler: boolean;
}

interface WalletTypes {
  wallet: string;
  address: string;
}

interface WalletsTypes {
  wallets: {
    ethereum: {
      wallet: string;
      address: string;
    };
    klyatn: {
      wallet: string;
      address: string;
    };
    solana: {
      wallet: string;
      address: string;
    };
  };
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TitleBox = ({
  title,
  deadline,
  checkSellingQuantity,
  checkListingQuantity,
}: string | any) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant={'h4'}>{title}</Typography>
      <SellingClock
        deadline={deadline}
        checkSellingQuantity={checkSellingQuantity}
        checkListingQuantity={checkListingQuantity}
      />
    </Box>
  );
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DetailBuy: React.FC<DetailBuyProps> = ({
  id,
  setItemActivityMutateHandler,
  itemActivityMutateHandler,
}) => {
  const theme = useTheme();
  const { library, account, activate } = useActiveWeb3React();
  // @ts-ignore
  const { ethereum, klaytn, solana, binance } = useSelector<WalletsTypes>(
    (state: WalletsTypes) => state.wallets,
  );

  const [selectedNetworkId, setSelectedNetworkId] = useState(1);
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
  const list_url = `${process.env.REACT_APP_API_SERVER}/admin-api/market/saleList/${id}?page=1&size=5`;

  const { data, error, mutate } = useSWR(API_URL, () => nftDetail(id));
  const { data: listingData, mutate: listingMutate } = useSWR(list_url, fetcher);
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
  const [krwMessage, setKrwMessage] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = krwMessage;

  const buy = async () => {
    if (data?.data?.quote === 'krw') {
      setKrwMessage({ ...krwMessage, open: true });
      return;
    }

    setBuyFlag(true);
    setSellingQuantity((curr: number) => curr - parseInt(amount));
    const isKaikas =
      library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
    // tokenId 를 구해온다.
    const serials = await selectSerials(id, account, amount);

    if (serials.status === 0) {
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

      console.log('network....', data?.data?.collection_id?.network);
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
        getChainId(data?.data?.collection_id?.network),
      );
    } catch (e) {
      // 실패인 경우 원복.
      console.log('=====>', serials.data, parseInt(serials.data[0].token_id, 16));
      await cancelBuy(id, serials.data[0].token_id, account);
      setSellingQuantity((curr: number) => curr + parseInt(amount));
    }
    await mutate();
    await myNftMutate();
    setItemActivityMutateHandler(true);
    setAmount('1');
    setBuyFlag(false);
  };

  const handleCloseModal = async () => {
    setIsOpenConnectModal(false);
  };

  useEffect(() => {
    setSellingQuantity(data?.data?.quantity_selling);
    myNftMutate();
  }, [data?.data?.quantity_selling]);

  useEffect(() => {
    setTimeout(() => {
      mutate();
      listingMutate();
      myNftMutate();
    }, 2000);
  }, [itemActivityMutateHandler]);

  return (
    <SectionWrapper
      // title={`Sale ends ${new Date(data?.data?.end_date).toLocaleString()}`}
      title={
        <TitleBox
          title={
            (listingData && listingData?.data?.items.length !== 0) || sellingQuantity > 0
              ? `Sale ends ${new Date(data?.data?.end_date).toLocaleString()}`
              : 'Sold out'
          }
          deadline={data?.data?.end_date}
          checkSellingQuantity={sellingQuantity > 0}
          checkListingQuantity={listingData && listingData?.data?.items.length > 0}
        />
      }
      // icon={<StorefrontOutlinedIcon />}
    >
      <>
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
            {sellingQuantity === 0 ? 'Current Price' : 'Price'}
          </Typography>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'flex-end'}
            gap={'0.5rem'}
          >
            {data?.data?.quote === 'klay' && <img src={klayLogo} alt="klay" height="24px" />}
            {data?.data?.quote === 'talk' && <img src={talkLogo} alt="talk" height="24px" />}
            {data?.data?.quote === 'bnb' && <img src={bnbLogo} alt="bnb" height="24px" />}
            {data?.data?.quote === 'krw' && (
              <Typography variant={'h1'} color={'text.primary'}>
                ￦
              </Typography>
            )}
            <Typography variant={'h1'}>
              {sellingQuantity === 0 && !buyFlag
                ? getNftPrice(
                    data?.data?.price,
                    data?.data?.floor_price,
                    data?.data?.user_quantity_selling,
                    data?.data?.quantity_selling,
                    data?.data?.last_price,
                  )
                : sliceFloatNumber(data?.data?.price.toString())}
            </Typography>
            {/*{data?.data?.quote === 'krw' && (*/}
            {/*  <Typography variant={'caption'} color={'text.primary'} pb={1}>*/}
            {/*    (Included 10% VAT)*/}
            {/*  </Typography>*/}
            {/*)}*/}
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
                    inputProps={{ min: 1, step: 1 }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const validated = e.target.value.match(/^(\s*|\d+)$/);
                      if (validated && parseInt(e.target.value) <= 0) {
                        setAmount('0');
                      } else {
                        setAmount(parseInt(e.target.value).toString());
                      }
                    }}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      parseInt(e.target.value) <= 0
                        ? '1'
                        : setAmount(parseInt(e.target.value).toString())
                    }
                    sx={{ flex: 5 }}
                  />

                  {account === undefined ? (
                    <Button
                      variant="contained"
                      onClick={() => setIsOpenConnectModal(true)}
                      sx={{ flex: 1, fontSize: '14px' }}
                    >
                      Connect Wallet
                    </Button>
                  ) : (
                    <Box>
                      <LoadingButton
                        onClick={buy}
                        disabled={
                          sellingQuantity === 0 ||
                          sellingQuantity < parseInt(amount) ||
                          parseInt(amount) === 0 ||
                          isNaN(parseInt(amount))
                        }
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
      </>
      <WalletConnectorDialog
        selectedNetworkIndex={selectedNetworkId}
        isOpenConnectModal={isOpenConnectModal}
        handleCloseModal={handleCloseModal}
        activate={activate}
        ethereum={ethereum}
        klaytn={klaytn}
        solana={solana}
        binance={binance}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => setKrwMessage({ ...krwMessage, open: false })}
        // message="Payment in KRW is currently only possible through bank transfer. Please contact nftsales@taal.fi"
        key={vertical + horizontal}
      >
        <Alert severity="error">
          Payment in KRW is currently only possible through bank transfer. Please contact
          nftsales@taal.fi
        </Alert>
      </Snackbar>

      {/*<WalletDialog*/}
      {/*  isOpenConnectModal={isOpenConnectModal}*/}
      {/*  handleCloseModal={handleCloseModal}*/}
      {/*  activate={activate}*/}
      {/*/>*/}
    </SectionWrapper>
  );
};

export default DetailBuy;
