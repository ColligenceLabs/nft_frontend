import React from 'react';
import { Box, Typography } from '@mui/material';
import SectionWrapper from '../SectionWrapper';
import { CollectionDetailResponse, NFTType } from '../../../types';
import splitAddress from '../../../../../utils/splitAddress';

interface DetailInformationProps {
  collection: CollectionDetailResponse;
  nft: NFTType;
}
const DetailInformation: React.FC<DetailInformationProps> = ({ nft, collection }) => {
  const handleViewExplorer = (chain: string, address: string) => {
    let url = '';
    switch (chain) {
      case 'ethereum':
        url =
          process.env.REACT_APP_MAINNET === 'true'
            ? `https://etherscan.io/address/${address}`
            : `https://ropsten.etherscan.io/address/${address}`;
        break;
      case 'klaytn':
        url =
          process.env.REACT_APP_MAINNET === 'true'
            ? `https://scope.klaytn.com/account/${address}?tabId=txList`
            : `https://baobab.scope.klaytn.com/account/${address}?tabId=txList`;
        break;
      case 'solana':
        url =
          process.env.REACT_APP_MAINNET === 'true'
            ? `https://solscan.io/account/${address}?cluster=mainnet-beta`
            : `https://solscan.io/account/${address}?cluster=devnet`;
        break;
    }

    window.open(url, '_blank');
  };

  return (
    <>
      <SectionWrapper title={'Description'} icon={'info'} maxHeight={'200px'}>
        <Box sx={{ p: 2 }}>
          <Typography variant={'body2'} sx={{ paddingX: 1 }}>
            {nft.metadata.description}
          </Typography>
        </Box>
      </SectionWrapper>
      <SectionWrapper
        title={
          collection.name !== '' || collection.name !== undefined
            ? `${collection.name}`
            : `${collection.contract_address}`
        }
        icon={'info'}
        maxHeight={'200px'}
        toggled={false}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant={'body2'} sx={{ paddingX: 1 }}>
            {collection.description}
          </Typography>
        </Box>
      </SectionWrapper>
      <SectionWrapper title={'Details'} icon={'info'} maxHeight={'200px'} toggled={false}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant={'body2'}>Contract Address</Typography>
            <Typography
              variant={'body2'}
              sx={{ cursor: 'pointer' }}
              onClick={() => handleViewExplorer(collection.network, collection.contract_address)}
              color={'primary'}
            >
              {splitAddress(collection.contract_address)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant={'body2'}>Token ID</Typography>
            <Typography variant={'body2'}>{nft.metadata.tokenId}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant={'body2'}>Token Standard</Typography>
            <Typography variant={'body2'}>{collection.contract_type}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant={'body2'}>Blockchain</Typography>
            <Typography variant={'body2'}>{collection.network.toUpperCase()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant={'body2'}>Creator Fees</Typography>
            <Typography variant={'body2'}>0%</Typography>
          </Box>
        </Box>
      </SectionWrapper>
    </>
  );
};

export default DetailInformation;
