import { useMemo } from 'react';
import { ethers } from 'ethers';
import contracts from '../config/constants/contracts';
import kip17Abi from '../config/abi/kip17.json';
import kip37Abi from '../config/abi/kip37.json';
import useActiveWeb3React from './useActiveWeb3React';

export const useKip17Contract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
}

export const useKip37Contract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => new ethers.Contract(contracts.kip37[1001], kip37Abi, library.getSigner()), [library]);
}