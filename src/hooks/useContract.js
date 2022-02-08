import { useMemo } from 'react';
import { ethers } from 'ethers';
import contracts from '../config/constants/contracts';
import kip17Abi from '../config/abi/kip17.json';
import kip37Abi from '../config/abi/kip37.json';
import useActiveWeb3React from './useActiveWeb3React';

export const useKip17Contract = (contract) => {
  const { library } = useActiveWeb3React();
  // TODO: mint 할 collection 정보로 부터 contract address 를 보내줌.
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  return useMemo(() => new ethers.Contract(contract, kip17Abi, library?.getSigner()), [library]);
};

export const useKip37Contract = (contract) => {
  const { library } = useActiveWeb3React();
  // TODO: mint 할 collection 정보로 부터 contract address 를 보내줌.
  // return useMemo(
  //   () => new ethers.Contract(contracts.kip37[1001], kip37Abi, library.getSigner()),
  //   [library],
  // );
  return useMemo(() => new ethers.Contract(contract, kip37Abi, library.getSigner()), [library]);
};
