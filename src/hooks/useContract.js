import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import contracts from '../config/constants/contracts';
import kip17Abi from '../config/abi/kip17.json';
import kip37Abi from '../config/abi/kip37.json';

export const useKip17Contract = () => {
  const { library } = useWeb3React();
  console.log('---->', library);
  return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library.getSigner()), [library]);
}

export const useKip37Contract = () => {
  const { library } = useWeb3React();
  return useMemo(() => new ethers.Contract(contracts.kip37[1001], kip37Abi, library.getSigner()), [library]);
}