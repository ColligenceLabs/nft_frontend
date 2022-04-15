import { useMemo } from 'react';
import { ethers } from 'ethers';
import contracts from '../config/constants/contracts';
import kip17Abi from '../config/abi/kip17.json';
import kip37Abi from '../config/abi/kip37.json';
// import marketAbi from '../config/abi/market.json';
import marketAbi from '../config/abi/marketV3.json';
import tokenAbi from '../config/abi/erc20.json';
import useActiveWeb3React from './useActiveWeb3React';
import Caver from 'caver-js';
import { kip17Data } from '../contracts';

export const useKipContract = (contract, type) => {
  const { library } = useActiveWeb3React();
  // TODO: mint 할 collection 정보로 부터 contract address 를 보내줌.
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  const abi = type === 'KIP17' ? kip17Abi : kip37Abi;
  return useMemo(() => {
    if (type === 'SPLToken' || !contract) return;
    return new ethers.Contract(contract, abi, library?.getSigner());
  }, [library, contract, type]);
};

export const useKipContractWithKaikas = (contract, type) => {
  const caver = new Caver(window.klaytn);

  const { library } = useActiveWeb3React();
  // TODO: mint 할 collection 정보로 부터 contract address 를 보내줌.
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  const abi = type === 'KIP17' ? kip17Abi : kip37Abi;
  return useMemo(() => {
    if (type === 'SPLToken' || !contract) return;
    return new caver.klay.Contract(abi, contract);
  }, [library, contract, type]);
};

export const useMarketContract = () => {
  const { library } = useActiveWeb3React();
  // const contract = contracts.market[process.env.REACT_APP_MAINNET === 'true' ? 8217 : 1001];
  const contract = contracts.marketV3[process.env.REACT_APP_MAINNET === 'true' ? 8217 : 1001];
  return useMemo(() => {
    if (!library) return;
    if (library.connection.url === 'metamask' || library.connection.url === 'eip-1193:') {
      return new ethers.Contract(contract, marketAbi, library?.getSigner());
    } else {
      const caver = new Caver(window.klaytn);
      return new caver.klay.Contract(marketAbi, contract);
    }
  }, [library]);
};

export const useTokenContract = () => {
  const { library } = useActiveWeb3React();
  const tokenAddress = contracts.quoteToken[process.env.REACT_APP_MAINNET === 'true' ? 8217 : 1001];
  return useMemo(() => {
    if (!library) return;
    if (library.connection.url === 'metamask' || library.connection.url === 'eip-1193:')
      return new ethers.Contract(tokenAddress, tokenAbi, library?.getSigner());
    else {
      const caver = new Caver(window.klaytn);
      return new caver.klay.Contract(tokenAbi, tokenAddress);
    }
  }, [library]);
};
