import Caver from 'caver-js';
import kip17Abi from '../config/abi/kip17.json';
import kip37Abi from '../config/abi/kip37.json';
import { ethers } from 'ethers';

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