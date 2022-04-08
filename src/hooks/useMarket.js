import { useCallback } from 'react';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import useActiveWeb3React from './useActiveWeb3React';
import { FAILURE, SUCCESS } from '../config/constants/consts';
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
      const isKaikas = library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
      let tx;
      let gasLimit;
      try {
        // nftContract 에서 marketContract 를 approve
        if (!isKaikas)
          gasLimit = await nftContract.estimateGas.approve(marketContract.address, tokenId);
        else{
          gasLimit = await nftContract.methods.approve(marketContract._address, tokenId)
            .estimateGas({
              from: account
            });
        }
      } catch (e) {
        console.log('approve estimateGas fail.', e);
        // return FAILURE;
        throw e;
      }
      console.log('gasLimit:', gasLimit);
      console.log('library:', library);

      try {
        if (!isKaikas) {
          tx = await nftContract.approve(marketContract.address, tokenId, {
            gasPrice,
            gasLimit: calculateGasMargin(gasLimit),
          });
          const receipt = await tx.wait();
          console.log(receipt);
        } else {
          tx = await nftContract.methods.approve(marketContract._address, tokenId).send({
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
          });
          console.log(tx);
        }
      } catch (e) {
        console.log('approve fail.', e);
        // return FAILURE;
        throw e;
      }
      console.log('approve success.');
      // const approved = await nftContract.getApproved(tokenId);
      // console.log(approved);

      const parsedPrice = parseUnits(price, 'ether').toString();
      // sell
      try {
        if (!isKaikas)
          gasLimit = await marketContract.estimateGas.readyToSellToken(nftContract.address, tokenId, parsedPrice);
        else
          gasLimit = await marketContract.methods.readyToSellToken(nftContract._address, tokenId, parsedPrice)
            .estimateGas({
              from: account
            });
      } catch (e) {
        console.log('readyToSell estimateGas fail.', e);
        // return FAILURE;
        throw e;
      }
      console.log('readyToSellToken gasLimit:', gasLimit);

      try {
        if (!isKaikas) {
          tx = await marketContract.readyToSellToken(nftContract.address, tokenId, parsedPrice, {
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(gasLimit),
          });
          const receipt = await tx.wait();
          console.log(receipt);
        } else {
          tx = await marketContract.methods.readyToSellToken(nftContract._address, tokenId, parsedPrice).send({
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
          });
          console.log(tx);
        }
      } catch (e) {
        console.log('readyToSell fail.', e);
        // return FAILURE;
        throw e;
      }
      return SUCCESS;
    },
    [library, account],
  );

  const buyNFT = useCallback(
    async (nftContract, tokenId, price) => {
      console.log('buy!');
      const gasPrice = await caver.klay.getGasPrice();
      const isKaikas = library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
      let tx;
      let gasLimit;
      // approve
      const parsedPrice = parseUnits(price, 'ether').toString();
      try {
        console.log(marketContract);
        if (!isKaikas) {
          gasLimit = await tokenContract.estimateGas.approve(marketContract.address, parsedPrice);
        } else {
          gasLimit = await tokenContract.methods.approve(marketContract._address, parsedPrice)
            .estimateGas({from: account});
        }
        console.log('buyNFT approve estimateGas', gasLimit);
      } catch (e) {
        console.log('buyNFT approve estimateGas fail.', e);
        return FAILURE;
      }

      try {
        let receipt;
        if (!isKaikas) {
          tx = await tokenContract.approve(marketContract.address, parsedPrice, {
            gasPrice,
            gasLimit: calculateGasMargin(gasLimit),
          });
          receipt = await tx.wait();
        } else {
          receipt = await tokenContract.methods.approve(marketContract._address, parsedPrice)
            .send({
              from: account,
              gasPrice,
              gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
            });
        }
        console.log('buyNFT approve receipt', receipt);
      } catch (e) {
        console.log('buyNFT approve fail.', e);
        return FAILURE;
      }

      let allowance;
      if (!isKaikas)
        allowance = await tokenContract.allowance(account, marketContract.address);
      else
        allowance = await tokenContract.methods.allowance(account, marketContract._address).call();
      console.log(allowance.toString());

      // buy
      try {
        if (!isKaikas) {
          console.log(nftContract.address, tokenId, parsedPrice);
          gasLimit = await marketContract.estimateGas.buyToken(nftContract.address, tokenId, parsedPrice);
        } else {
          console.log(nftContract._address, tokenId, parsedPrice);
          gasLimit = await marketContract.methods.buyToken(nftContract._address, tokenId, parsedPrice)
            .estimateGas({from: account});
        }

        console.log('buyNFT buyToken estimateGas', gasLimit);
      } catch (e) {
        console.log('buyNFT buyToken estimateGas fail.', e);
        return FAILURE;
      }

      try {
        let receipt;
        if (!isKaikas) {
          tx = await marketContract.buyToken(nftContract.address, tokenId, parsedPrice, {
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(gasLimit),
          });
          receipt = await tx.wait();
        } else {
          receipt = await marketContract.methods.buyToken(nftContract._address, tokenId, parsedPrice)
            .send({
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
          });
        }
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
      let nfts;
      const isKaikas = library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
      console.log(isKaikas);
      if (!isKaikas) {
        nfts = await marketContract.getNftAllAsks(nftContractAddress);
      } else {
        nfts = await marketContract.methods.getNftAllAsks(nftContractAddress).call();
      }
      console.log(nfts);
      return nfts;
    },
    [library, account],
  );

  return {
    sellNFT,
    buyNFT,
    listNFT
  };
};

export default useMarket;
