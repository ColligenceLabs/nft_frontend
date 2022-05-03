import { useCallback } from 'react';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumber, ethers } from 'ethers';
import useActiveWeb3React from './useActiveWeb3React';
import { FAILURE, SUCCESS } from '../config/constants/consts';
import { useMarketContract, useTokenContract } from './useContract';
import { RPC_URLS } from '../connectors';
import Caver from 'caver-js';
const rpcUrl = RPC_URLS[process.env.REACT_APP_MAINNET === 'true' ? 8217 : 1001];
const caver = new Caver(rpcUrl);
import quoteTokens from '../config/constants/quoteTokens';
// import contracts from '../config/constants/contracts';
import tokenAbi from '../config/abi/erc20.json';
import { targetNetwork } from '../config';

// add 10%
export function calculateGasMargin(value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

const useMarket = () => {
  const marketContract = useMarketContract();
  // const tokenContract = useTokenContract();
  const { library, account } = useActiveWeb3React();

  const getTokenContract = (tokenAddress) => {
    if (!library) return;
    if (library.connection.url === 'metamask' || library.connection.url === 'eip-1193:')
      return new ethers.Contract(tokenAddress, tokenAbi, library?.getSigner());
    else {
      const caver = new Caver(window.klaytn);
      return new caver.klay.Contract(tokenAbi, tokenAddress);
    }
  };

  const sellNFT = useCallback(
    // V3 : function readyToSellToken(address _nft, uint256 _tokenId, uint256 _price, address _quote) external;
    // V4 : function readyToSellToken(address _nft, uint _nftType, uint256 _tokenId, uint256 _quantity, uint256 _price, address _quote) external;
    async (nftContract, nftType, tokenId, quantity, price, quote) => {
      // TODO. kas 를 사용하는 경우 api 호출 로직 분리 필요
      console.log('sell!', nftType);
      const gasPrice = await caver.klay.getGasPrice();
      console.log('gasPrice', gasPrice);
      const quoteToken = quoteTokens[quote][parseInt(targetNetwork, 16)];
      const isKaikas =
        library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
      let tx;
      let gasLimit;
      let test;
      if (!isKaikas) {
        if (nftType === 721) {
          test = await nftContract.getApproved(tokenId);
        } else if (nftType === 1155) {
          test = await nftContract.isApprovedForAll(account, marketContract.address);
        }
      } else {
        if (nftType === 721) {
          test = await nftContract.methods.getApproved(tokenId).call();
        } else if (nftType === 1155) {
          test = await nftContract.methods
            .isApprovedForAll(account, marketContract._address)
            .call();
        }
      }
      console.log(marketContract.address, marketContract.address !== test, test, typeof test);
      if (test !== true) {
        console.log('start approve');
        try {
          // nftContract 에서 marketContract 를 approve
          if (!isKaikas) {
            if (nftType === 721) {
              gasLimit = await nftContract.estimateGas.approve(marketContract.address, tokenId);
            } else if (nftType === 1155) {
              gasLimit = await nftContract.estimateGas.setApprovalForAll(
                marketContract.address,
                'true',
              );
            }
          } else {
            if (nftType === 721) {
              gasLimit = await nftContract.methods
                .approve(marketContract._address, tokenId)
                .estimateGas({
                  from: account,
                });
            } else if (nftType === 1155) {
              gasLimit = await nftContract.methods
                .setApprovalForAll(marketContract._address, tokenId)
                .estimateGas({
                  from: account,
                });
            }
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
            if (nftType === 721) {
              tx = await nftContract.approve(marketContract.address, tokenId, {
                gasPrice,
                gasLimit: calculateGasMargin(gasLimit),
              });
            } else if (nftType === 1155) {
              tx = await nftContract.setApprovalForAll(marketContract.address, 'true', {
                gasPrice,
                gasLimit: calculateGasMargin(gasLimit),
              });
            }
            const receipt = await tx.wait();
            console.log(receipt);
          } else {
            if (nftType === 721) {
              tx = await nftContract.methods.approve(marketContract._address, tokenId).send({
                from: account,
                gasPrice,
                gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
              });
            } else if (nftType === 1155) {
              tx = await nftContract.methods
                .setApprovalForAll(marketContract._address, 'true')
                .send({
                  from: account,
                  gasPrice,
                  gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
                });
            }
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
      }

      console.log(price, typeof price);

      const parsedPrice = parseUnits(price.toString(), 'ether').toString();
      console.log(parsedPrice);
      // sell
      try {
        if (!isKaikas)
          gasLimit = await marketContract.estimateGas.readyToSellToken(
            nftContract.address,
            nftType,
            tokenId,
            quantity,
            parsedPrice,
            quoteToken,
          );
        else
          gasLimit = await marketContract.methods
            .readyToSellToken(
              nftContract._address,
              nftType,
              tokenId,
              quantity,
              parsedPrice,
              quoteToken,
            )
            .estimateGas({
              from: account,
            });
      } catch (e) {
        console.log('readyToSell estimateGas fail.', e);
        // return FAILURE;
        throw e;
      }
      console.log('readyToSellToken gasLimit:', gasLimit);

      try {
        if (!isKaikas) {
          tx = await marketContract.readyToSellToken(
            nftContract.address,
            nftType,
            tokenId,
            quantity,
            parsedPrice,
            quoteToken,
            {
              from: account,
              gasPrice,
              gasLimit: calculateGasMargin(gasLimit),
            },
          );
          const receipt = await tx.wait();
          console.log(receipt);
        } else {
          tx = await marketContract.methods
            .readyToSellToken(
              nftContract._address,
              nftType,
              tokenId,
              quantity,
              parsedPrice,
              quoteToken,
            )
            .send({
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
    // V3 : function buyToken(address _nft, uint256 _tokenId, uint256 _maximumPrice) external;
    // V4 : function buyToken(address _nft, uint256 _tokenId, address _seller, uint256 _quantity, uint256 _amount, uint256 _maximumPrice, address _quote) external;
    async (nftContract, tokenId, seller, quantity, amount, price, quote) => {
      console.log('buy!', tokenId);
      const gasPrice = await caver.klay.getGasPrice();
      const isKaikas =
        library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
      let tx;
      let gasLimit;
      // approve
      console.log('===>', price, quote, quoteTokens[quote]);
      const quoteToken = quoteTokens[quote][parseInt(targetNetwork, 16)];
      const tokenContract = getTokenContract(quoteToken);
      const parsedPrice = parseUnits(price.toString(), 'ether').toString();
      const approvePrice = parseUnits((price * amount).toString(), 'ether').toString();

      if (quote !== 'eth' && quote !== 'klay') {
        try {
          console.log(marketContract);
          if (!isKaikas) {
            gasLimit = await tokenContract.estimateGas.approve(
              marketContract.address,
              approvePrice,
            );
          } else {
            gasLimit = await tokenContract.methods
              .approve(marketContract._address, approvePrice)
              .estimateGas({ from: account });
          }
          console.log('buyNFT approve estimateGas', gasLimit);
        } catch (e) {
          console.log('buyNFT approve estimateGas fail.', e);
          // return FAILURE;
          throw e;
        }

        try {
          let receipt;
          if (!isKaikas) {
            tx = await tokenContract.approve(marketContract.address, approvePrice, {
              gasPrice,
              gasLimit: calculateGasMargin(gasLimit),
            });
            receipt = await tx.wait();
          } else {
            receipt = await tokenContract.methods
              .approve(marketContract._address, approvePrice)
              .send({
                from: account,
                gasPrice,
                gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
              });
          }
          console.log('buyNFT approve receipt', receipt);
        } catch (e) {
          console.log('buyNFT approve fail.', e);
          // return FAILURE;
          throw e;
        }

        let allowance;
        if (!isKaikas) allowance = await tokenContract.allowance(account, marketContract.address);
        else
          allowance = await tokenContract.methods
            .allowance(account, marketContract._address)
            .call();
        console.log(allowance.toString());
      }

      // buy
      if (quote !== 'eth' && quote !== 'klay') {
        try {
          if (!isKaikas) {
            gasLimit = await marketContract.estimateGas.buyToken(
              nftContract.address,
              tokenId,
              seller,
              quantity,
              amount,
              parsedPrice,
              quoteToken,
            );
          } else {
            console.log(
              nftContract._address,
              tokenId,
              seller,
              quantity,
              amount,
              parsedPrice,
              quoteToken,
            );
            gasLimit = await marketContract.methods
              .buyToken(
                nftContract._address,
                tokenId,
                seller,
                quantity,
                amount,
                parsedPrice,
                quoteToken,
              )
              .estimateGas({ from: account });
          }

          console.log('buyNFT buyToken estimateGas', gasLimit);
        } catch (e) {
          console.log('buyNFT buyToken estimateGas fail.', e);
          // return FAILURE;
          throw e;
        }

        try {
          let receipt;
          if (!isKaikas) {
            tx = await marketContract.buyToken(
              nftContract.address,
              tokenId,
              seller,
              quantity,
              amount,
              parsedPrice,
              quoteToken,
              {
                from: account,
                gasPrice,
                gasLimit: calculateGasMargin(gasLimit),
              },
            );
            receipt = await tx.wait();
          } else {
            receipt = await marketContract.methods
              .buyToken(
                nftContract._address,
                tokenId,
                seller,
                quantity,
                amount,
                parsedPrice,
                quoteToken,
              )
              .send({
                from: account,
                gasPrice,
                gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
              });
          }
          console.log('buyNFT buyToken receipt', receipt);
        } catch (e) {
          console.log('buyNFT buyToken fail.', e);
          // return FAILURE;
          throw e;
        }
      } else {
        try {
          if (!isKaikas) {
            console.log(nftContract.address, tokenId, seller, quantity, amount, approvePrice);
            gasLimit = await marketContract.estimateGas.buyTokenETH(
              nftContract.address,
              tokenId,
              seller,
              quantity,
              amount,
              parsedPrice,
              {
                value: approvePrice,
              },
            );
          } else {
            console.log(nftContract._address, tokenId, seller, quantity, amount, approvePrice);
            gasLimit = await marketContract.methods
              .buyTokenETH(nftContract._address, tokenId, seller, quantity, amount, parsedPrice)
              .estimateGas({ value: approvePrice, from: account });
          }

          console.log('buyNFT buyToken estimateGas', gasLimit);
        } catch (e) {
          console.log('buyNFT buyToken estimateGas fail.', e);
          // return FAILURE;
          throw e;
        }

        try {
          let receipt;
          if (!isKaikas) {
            tx = await marketContract.buyTokenETH(
              nftContract.address,
              tokenId,
              seller,
              quantity,
              amount,
              parsedPrice,
              {
                value: approvePrice,
                from: account,
                gasPrice,
                gasLimit: calculateGasMargin(gasLimit),
              },
            );
            receipt = await tx.wait();
          } else {
            receipt = await marketContract.methods
              .buyTokenETH(nftContract._address, tokenId, seller, quantity, amount, parsedPrice)
              .send({
                value: approvePrice,
                from: account,
                gasPrice,
                gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
              });
          }
          console.log('buyNFT buyToken receipt', receipt);
        } catch (e) {
          console.log('buyNFT buyToken fail.', e);
          // return FAILURE;
          throw e;
        }
      }

      return SUCCESS;
    },
    [library, account],
  );

  const stopSelling = useCallback(
    // V4 : function cancelSellToken(address _nft, uint256 _tokenId, uint256 _quantity, uint256 _price, address _quote) external;
    async (nftContract, tokenId, quantity, price, quote) => {
      console.log('cancel!', tokenId);
      const gasPrice = await caver.klay.getGasPrice();
      const isKaikas =
        library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
      let tx;
      let gasLimit;
      console.log('----->', quote, parseInt(targetNetwork, 16));
      const quoteToken = quoteTokens[quote][parseInt(targetNetwork, 16)];
      console.log('----->', quoteToken);
      const parsedPrice = parseUnits(price.toString(), 'ether').toString();

      console.log('---', nftContract.address, tokenId, quantity, parsedPrice, quoteToken);
      // buy
      try {
        if (!isKaikas) {
          gasLimit = await marketContract.estimateGas.cancelSellToken(
            nftContract.address,
            tokenId,
            quantity,
            parsedPrice,
            quoteToken,
          );
        } else {
          gasLimit = await marketContract.methods
            .cancelSellToken(nftContract._address, tokenId, quantity, parsedPrice, quoteToken)
            .estimateGas({ from: account });
        }

        console.log('stopSelling cancelSellToken estimateGas', gasLimit);
      } catch (e) {
        console.log('stopSelling cancelSellToken estimateGas fail.', e);
        // return FAILURE;
        throw e;
      }

      try {
        let receipt;
        if (!isKaikas) {
          tx = await marketContract.cancelSellToken(
            nftContract.address,
            tokenId,
            quantity,
            parsedPrice,
            quoteToken,
            {
              from: account,
              gasPrice,
              gasLimit: calculateGasMargin(gasLimit),
            },
          );
          receipt = await tx.wait();
        } else {
          receipt = await marketContract.methods
            .cancelSellToken(nftContract._address, tokenId, quantity, parsedPrice, quoteToken)
            .send({
              from: account,
              gasPrice,
              gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
            });
        }
        console.log('stopSelling cancelSellToken receipt', receipt);
      } catch (e) {
        console.log('stopSelling cancelSellToken fail.', e);
        // return FAILURE;
        throw e;
      }

      return SUCCESS;
    },
    [library, account],
  );

  const listNFT = useCallback(
    async (nftContractAddress) => {
      let nfts;
      const isKaikas =
        library.connection.url !== 'metamask' && library.connection.url !== 'eip-1193:';
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
    stopSelling,
    listNFT,
  };
};

export default useMarket;
