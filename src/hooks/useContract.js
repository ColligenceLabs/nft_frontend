import { useMemo } from 'react';
import { ethers } from 'ethers';
import contracts from '../config/constants/contracts';
import kip17Abi from '../config/abi/kip17.json';
import kip37Abi from '../config/abi/kip37.json';
import useActiveWeb3React from './useActiveWeb3React';
import Caver from 'caver-js';
import { kip17Data } from '../contracts';

export const useKipContract = (contract, type) => {
  const { library } = useActiveWeb3React();
  // TODO: mint 할 collection 정보로 부터 contract address 를 보내줌.
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  const abi = type === 'KIP17' ? kip17Abi : kip37Abi;
  return useMemo(
    () => new ethers.Contract(contract, abi, library?.getSigner()),
    [library, contract, type],
  );
};

export const useKipContractWithKaikas = (contract, type) => {
  const caver = new Caver(window.klaytn);

  const { library } = useActiveWeb3React();
  // TODO: mint 할 collection 정보로 부터 contract address 를 보내줌.
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  // return useMemo(() => new ethers.Contract(contracts.kip17[1001], kip17Abi, library?.getSigner()), [library]);
  const abi = type === 'KIP17' ? kip17Abi : kip37Abi;
  return useMemo(
    () => new caver.klay.Contract(abi, contract),
    [library, contract, type],
  );
};
