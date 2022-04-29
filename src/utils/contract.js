import Caver from 'caver-js';
import kip17Abi from '../config/abi/kip17.json';
import kip37Abi from '../config/abi/kip37.json';
import { ethers } from 'ethers';
import contracts from '../config/constants/contracts';
import tokenAbi from '../config/abi/erc20.json';

export const getNftContract = (library, contract, type) => {
  const isKaikas =
    library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
  if (isKaikas) {
    const caver = new Caver(window.klaytn);
    return new caver.klay.Contract(type === 'KIP17' ? kip17Abi : kip37Abi, contract);
  } else {
    return new ethers.Contract(
      contract,
      type === 'KIP17' ? kip17Abi : kip37Abi,
      library?.getSigner(),
    );
  }
};

export const getKipContract = (library, contract, type) => {
  if (type === 'SPLToken' || !contract) return;
  const isKaikas =
    library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
  const abi = type === 'KIP17' ? kip17Abi : kip37Abi;
  if (isKaikas) {
    const caver = new Caver(window.klaytn);
    return new caver.klay.Contract(abi, contract);
  } else {
    return new ethers.Contract(contract, abi, library?.getSigner());
  }
};

export const getTokenContract = (library) => {
  const tokenAddress = contracts.quoteToken[process.env.REACT_APP_MAINNET === 'true' ? 8217 : 1001];
  if (library.connection.url === 'metamask' || library.connection.url === 'eip-1193:')
    return new ethers.Contract(tokenAddress, tokenAbi, library?.getSigner());
  else {
    const caver = new Caver(window.klaytn);
    return new caver.klay.Contract(tokenAbi, tokenAddress);
  }
};