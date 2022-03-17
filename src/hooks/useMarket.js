import { useCallback, useState } from 'react';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumber, ethers } from 'ethers';
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
  const { library, account } = useActiveWeb3React();

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
          from: account,
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
    [library, account],
  );

  const buyNFT = useCallback(
    async (nftContract, tokenId, price) => {
      console.log('buy!');
      const gasPrice = await caver.klay.getGasPrice();
      let tx;
      let gasLimit;
      // approve
      const parsedPrice = parseUnits(price, 'gwei').toString();
      const amount = ethers.BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      try {
        gasLimit = await tokenContract.estimateGas.approve(marketContract.address, parsedPrice);
        console.log('buyNFT approve estimateGas', gasLimit);
      } catch (e) {
        console.log('buyNFT approve estimateGas fail.', e);
        return FAILURE;
      }

      try {
        tx = await tokenContract.approve(marketContract.address, parsedPrice, {
          gasPrice,
          gasLimit: calculateGasMargin(gasLimit),
        });
        const receipt = await tx.wait();
        console.log('buyNFT approve receipt', receipt);
      } catch (e) {
        console.log('buyNFT approve fail.', e);
        return FAILURE;
      }

      const allowance = await tokenContract.allowance(account, marketContract.address);
      console.log(allowance.toString());

      // buy
      try {
        console.log(nftContract.address, tokenId, parsedPrice);
        gasLimit = await marketContract.estimateGas.buyToken(nftContract.address, tokenId, parsedPrice);
        console.log('buyNFT buyToken estimateGas', gasLimit);
      } catch (e) {
        console.log('buyNFT buyToken estimateGas fail.', e);
        return FAILURE;
      }

      try {
        tx = await marketContract.buyToken(nftContract.address, tokenId, parsedPrice, {
          from: account,
          gasPrice,
          gasLimit: calculateGasMargin(gasLimit),
        });
        const receipt = await tx.wait();
        console.log('buyNFT buyToken receipt', receipt);
      } catch (e) {
        console.log('buyNFT buyToken fail.', e);
        return FAILURE;
      }

      return SUCCESS;
    },
    [library, account],
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
