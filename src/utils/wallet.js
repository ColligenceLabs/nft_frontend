import detectEthereumProvider from '@metamask/detect-provider';

const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  KLAYTN: 8217,
  BAOBAB: 1001,
};

const NETWORK_NAME = {
  [ChainId.MAINNET]: 'Ethereum Mainnet',
  [ChainId.ROPSTEN]: 'Ethereum Ropsten',
  [ChainId.RINKEBY]: 'Ethereum Rinkeby',
  [ChainId.KLAYTN]: 'Klaytn Cypress',
  [ChainId.BAOBAB]: 'Klaytn Baobab',
};

const SCAN_URL = {
  [ChainId.MAINNET]: 'https://etherscan.io',
  [ChainId.ROPSTEN]: 'https://ropsten.etherscan.io',
  [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io',
  [ChainId.KLAYTN]: 'https://scope.klaytn.com',
  [ChainId.BAOBAB]: 'https://baobab.scope.klaytn.com',
};

// const recoverChainId = () => {
//   const prevChainId = window.localStorage.getItem('prevChainId');
//   window.localStorage.setItem('chainId', prevChainId);
// };

let provider;

const addNetwork = async (chainId: number) => {
  if (provider && provider.request) {
    try {
      if (
        chainId === ChainId.MAINNET ||
        chainId === ChainId.ROPSTEN ||
        chainId === ChainId.RINKEBY
      ) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: NETWORK_NAME[chainId],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: [`${process.env.REACT_APP_NETWORK_URL}`],
              blockExplorerUrls: [`${SCAN_URL[chainId]}/`],
            },
          ],
        });
      } else if (chainId === ChainId.BAOBAB) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Klaytn Baobab',
              nativeCurrency: {
                name: 'klay',
                symbol: 'KLAY',
                decimals: 18,
              },
              rpcUrls: ['https://api.baobab.klaytn.net:8651'],
              blockExplorerUrls: ['https://baobab.scope.klaytn.com/'],
            },
          ],
        });
      } else if (chainId === ChainId.KLAYTN) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: 'Klaytn Mainnet',
              nativeCurrency: {
                name: 'KLAY',
                symbol: 'KLAY',
                decimals: 18,
              },
              rpcUrls: ['https://klaytn.taalswap.info:8651'],
              blockExplorerUrls: ['https://scope.klaytn.com/'],
            },
          ],
        });
      }
    } catch (addError) {
      // handle "add" error
      console.error(addError);
      switch (addError.code) {
        case -32602:
          return true;
        default:
          break;
      }
      return false;
    }
  } else {
    console.error(
      "Can't setup the ethereum mainnet on metamask because window.ethereum is undefined",
    );
    return false;
  }
  return true;
};

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainId: number) => {
  provider = await detectEthereumProvider();

  let result;
  result = await addNetwork(chainId);

  if (provider && provider.request) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        result = await addNetwork(chainId);
        // } else if (error.code === 4001 || error instanceof UserRejectedRequestError) {
        //   recoverChainId();
        //   return false;
      }
    }
  } else {
    console.error(
      "Can't setup the ethereum mainnet on metamask because window.ethereum is undefined",
    );
    return false;
  }
  return result;
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  provider = await detectEthereumProvider();
  const tokenAdded = await provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  });

  return tokenAdded;
};
