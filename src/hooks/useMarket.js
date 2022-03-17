import { useCallback, useState } from 'react';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import useActiveWeb3React from './useActiveWeb3React';
import { IPFS_URL, ALT_URL, FAILURE, SUCCESS } from '../config/constants/consts';
import { useMarketContract, useTokenContract } from './useContract';
import { RPC_URLS } from '../connectors';
import Caver from 'caver-js';
const rpcUrl = RPC_URLS[process.env.REACT_APP_MAINNET === 'true' ? 8217 : 1001];
const caver =  new Caver(rpcUrl);

// add 10%
export function calculateGasMargin(value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

const useMarket = () => {
  const marketContract = useMarketContract();
  const tokenContract = useTokenContract();
  const { library } = useActiveWeb3React();

  const sellNFT = useCallback(
    async (nftContract, tokenId, price) => {
      // TODO. kas 를 사용하는 경우 api 호출 로직 분리 필요
      console.log('sell!');
      const gasPrice = await caver.klay.getGasPrice();
      console.log('gasPrice', gasPrice);
      console.log('marketContract.address', marketContract.address);
      let tx;
      let gasLimit;
      try {
        // nftContract 에서 marketContract 를 approve
        gasLimit = await nftContract.estimateGas.approve(marketContract.address, tokenId);
      } catch (e) {
        console.log('approve estimateGas fail.', e);
        return FAILURE;
      }
      console.log('gasLimit:', gasLimit);
      console.log('library:', library);

      try {
        tx = await nftContract.approve(marketContract.address, tokenId, {
          gasPrice,
          gasLimit: calculateGasMargin(gasLimit),
        });
        const receipt = await tx.wait();
        console.log(receipt);
      } catch (e) {
        console.log('approve fail.', e);
        return FAILURE;
      }
      console.log('approve success.');
      const approved = await nftContract.getApproved(tokenId);
      console.log(approved);

      const parsedPrice = parseUnits(price, 'gwei').toString();
      // sell
      try {
        gasLimit = await marketContract.estimateGas.readyToSellToken(nftContract.address, tokenId, parsedPrice);
      } catch (e) {
        console.log('readyToSell estimateGas fail.', e);
        return FAILURE;
      }
      console.log('readyToSellToken gasLimit:', gasLimit);

      try {
        tx = await marketContract.readyToSellToken(nftContract.address, tokenId, parsedPrice, {
          from: library.address,
          gasPrice,
          gasLimit: calculateGasMargin(gasLimit),
        });
        const receipt = await tx.wait();
        console.log(receipt);
      } catch (e) {
        console.log('readyToSell fail.', e);
        return FAILURE;
      }
      return SUCCESS;
    },
    [library],
  );

  const buyNFT = useCallback(
    async () => {
      console.log('buy!');
      const gasPrice = await caver.klay.getGasPrice();
      let tx;
      // approve

      // buy

      return SUCCESS;
      // const gasPrice = parseUnits('750', 'gwei').toString();
      //
      // let tx;
      //
      // // check token_id
      // const creator = await contract.creators(tokenId);
      //
      // if (creator === '0x0000000000000000000000000000000000000000') {
      //   // gasLimit 계산
      //   const gasLimit = await contract.estimateGas.create(tokenId, amount, tokenUri);
      //
      //   // mint 요청
      //   try {
      //     tx = await contract.create(tokenId, amount, tokenUri, {
      //       from: account,
      //       gasPrice,
      //       gasLimit: calculateGasMargin(gasLimit),
      //       // gasLimit: 2000000,
      //     });
      //
      //     // receipt 대기
      //     let receipt;
      //     try {
      //       receipt = await tx.wait();
      //       if (receipt.status === 1) {
      //         await setNftOnchain(nftId);
      //       }
      //     } catch (e) {
      //       console.log(e);
      //       return FAILURE;
      //     }
      //     await setIsMinting(false);
      //     return SUCCESS;
      //   } catch (e) {
      //     console.log(e);
      //     await setIsMinting(false);
      //     return FAILURE;
      //   }
      // } else if (creator === account) {
      //   // KIP37의 경우 신규 Token ID를 create 한 후 추가로 mint 할 수 있으나... mint 함수를 인식하지 못하는 문제가 있음.
      //   // mintBatch 함수는 ok...
      //   // gasLimit 계산
      //   const tids = [];
      //   const amounts = [];
      //   tids.push(tokenId);
      //   amounts.push(amount);
      //   // TODO : TypeError: contract.estimateGas.mint is not a function
      //   // Klaytn KIP17 스마트컨트랙 수정하여 해결됨.
      //   const gasLimit = await contract.estimateGas.mint(tokenId, account, amount);
      //   // const gasLimit = await contract.estimateGas.mintBatch(account, tids, amounts);
      //
      //   // mint 요청
      //   try {
      //     // TODO : TypeError: contract.mint is not a function
      //     tx = await contract.mint(tokenId, account, amount, {
      //       // tx = await contract.mintBatch(account, tids, amounts, {
      //       from: account,
      //       gasPrice,
      //       // gasLimit: calculateGasMargin(gasLimit),
      //       gasLimit: 2000000,
      //     });
      //
      //     // receipt 대기
      //     let receipt;
      //     try {
      //       receipt = await tx.wait();
      //       if (receipt.status === 1) {
      //         await setNftOnchain(nftId);
      //       }
      //     } catch (e) {
      //       console.log(e);
      //       return FAILURE;
      //     }
      //     await setIsMinting(false);
      //     return SUCCESS;
      //   } catch (e) {
      //     console.log(e);
      //     await setIsMinting(false);
      //     return FAILURE;
      //   }
      // }
    },
    [library],
  );

  const listNFT = useCallback(
    async (nftContractAddress) => {
      const nfts = await marketContract.getNftAllAsks(nftContractAddress);
      console.log(nfts[0].price.toString(), nfts[0].tokenId.toString());

      return SUCCESS;
    },
    [library],
  );

  return {
    sellNFT,
    buyNFT,
    listNFT
  };
};

export default useMarket;
