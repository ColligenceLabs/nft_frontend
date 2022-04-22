import { ContractFactory } from '@ethersproject/contracts';
import { kip17Data, kip37Data } from '../contracts';
import Caver from 'caver-js';
// import { useWeb3React } from '@web3-react/core';
import { mkDirIPFS } from '../hooks/useNFT';
import { IPFS_URL, ALT_URL } from '../config/constants/consts';
import { parseUnits } from 'ethers/lib/utils';

export async function deployKIP17(name, symbol, account, library) {
  // hooks can not be called from inside a function
  // const { account, library } = useWeb3React();

  const factory = new ContractFactory(
    kip17Data.abi,
    kip17Data.bytecode,
    library.getSigner(account),
  );

  const ret = {};
  const gasPrice = parseUnits('750', 'gwei').toNumber();
  const contract = await factory
    .deploy(name, symbol, {
      gasPrice,
      gasLimit: 7000000,
    })
    .catch(function (err) {
      console.log(err);
      ret.err = err;
    });

  if (!!ret.err) return ret;

  const receipt = await contract.deployTransaction.wait().catch(function (err) {
    console.log(err);
    ret.err = err;
  });
  if (!!ret.err) return ret;
  const { confirmations } = receipt;
  ret.confirmations = confirmations;
  if (confirmations > 0) {
    const { address } = contract;
    ret.address = address;

    // TODO: 신규 스마트코트랙 주소 등 DB에 입력
    // ...
  } else {
    ret.err = receipt;
  }
  return ret;
}

export async function deployKIP37(name, account, library) {
  // hooks can not be called from inside a function
  // const { account, library } = useWeb3React();

  console.log('222--------->', name);

  const factory = new ContractFactory(
    kip37Data.abi,
    kip37Data.bytecode,
    library.getSigner(account),
  );

  // TODO : ipfs mkdir
  // try {
  //   const hash = await mkDirIPFS(name);
  // } catch (err) {
  //   console.log(err);
  // }
  // TODO : 403 forbidden why ?
  // const tokenUri = `${IPFS_URL}${hash}/{id}.json`;
  // const tokenUri = `${IPFS_URL}talken-nft/{id}.json`;
  const tokenUri = `${ALT_URL}/${name}/{id}.json`;
  // TODO : 백엔드에 디렉토리 생성 API 호출 필요함.

  const ret = {};
  const gasPrice = parseUnits('750', 'gwei').toNumber();
  const contract = await factory
    .deploy(tokenUri, {
      gasPrice,
      gasLimit: 7000000,
    })
    .catch(function (err) {
      console.log(err);
      ret.err = err;
    });

  if (!!ret.err) return ret;

  const receipt = await contract.deployTransaction.wait().catch(function (err) {
    console.log(err);
    ret.err = err;
  });
  if (!!ret.err) return ret;
  const { confirmations } = receipt;
  ret.confirmations = confirmations;
  if (confirmations > 0) {
    const { address } = contract;
    ret.address = address;

    // TODO: 신규 스마트코트랙 주소 등 DB에 입력
    // ...
  } else {
    ret.err = receipt;
  }
  return ret;
}

export async function deployKIP17WithKaikas(name, symbol, account, library) {
  // hooks can not be called from inside a function
  // const { account, library } = useWeb3React();

  const caver = new Caver(window.klaytn);
  const factory = new caver.klay.Contract(kip17Data.abi);
  // console.log('=====> ', factory, window.klaytn.selectedAddress);

  const ret = {};
  const contract = await factory
    .deploy({
      data: kip17Data.bytecode,
      arguments: [name, symbol],
    })
    .send({
      from: window.klaytn.selectedAddress,
      gas: 7000000,
      value: 0,
    })
    .catch(function (err) {
      console.log(err);
      ret.err = err;
    });

  // console.log('===>1234', contract, contract._address);

  if (!!ret.err) return ret;

  ret.address = contract._address;

  return ret;
}

export async function deployKIP37WithKaikas(name, account, library) {
  // hooks can not be called from inside a function
  // const { account, library } = useWeb3React();

  const caver = new Caver(window.klaytn);
  const factory = new caver.klay.Contract(kip37Data.abi);
  // console.log('=====> ', factory, window.klaytn.selectedAddress);

  // TODO : ipfs mkdir
  // try {
  //   const hash = await mkDirIPFS(name);
  // } catch (err) {
  //   console.log(err);
  // }
  // TODO : 403 forbidden why ?
  // const tokenUri = `${IPFS_URL}${hash}/{id}.json`;
  // const tokenUri = `${IPFS_URL}talken-nft/{id}.json`;
  const tokenUri = `${ALT_URL}/${name}/{id}.json`;
  // TODO : 백엔드에 디렉토리 생성 API 호출 필요함.

  const ret = {};
  const contract = await factory
    .deploy({
      data: kip37Data.bytecode,
      arguments: [tokenUri],
    })
    .send({
      from: window.klaytn.selectedAddress,
      gas: 7000000,
      value: 0,
    })
    .catch(function (err) {
      console.log(err);
      ret.err = err;
    });

  // console.log('===>1234', contract, contract._address);

  if (!!ret.err) return ret;

  ret.address = contract._address;

  return ret;
}
