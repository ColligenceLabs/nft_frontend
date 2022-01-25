import { ContractFactory } from '@ethersproject/contracts';
import { kip17Data, kip37Data } from 'src/contracts';
// import { useWeb3React } from '@web3-react/core';

async function deployKIP17(name, symbol, account, library) {
  // hooks can not be called from inside a function
  // const { account, library } = useWeb3React();

  const factory = new ContractFactory(
    kip17Data.abi,
    kip17Data.bytecode,
    library.getSigner(account),
  );

  console.log('deployKIP17 start!');
  const ret = {};
  const contract = await factory
    .deploy(name, symbol, {
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
  console.log('receipt', receipt);
  ret.confirmations = confirmations;
  if (confirmations > 0) {
    console.log('ㅏㅑㅖ17 contract deploy... confirmed!!', contract);
    const { address } = contract;
    ret.address = address;

    // 신규 스마트코트랙 주소 등 DB에 입력
  } else {
    ret.err = receipt;
    console.log(JSON.stringify(receipt));
  }
  return ret;
}

async function deployKIP37(tokenUri, account, library) {
  // hooks can not be called from inside a function
  // const { account, library } = useWeb3React();

  const factory = new ContractFactory(
    kip37Data.abi,
    kip37Data.bytecode,
    library.getSigner(account),
  );

  console.log('deployKIP37 start!');
  const ret = {};
  const contract = await factory
    .deploy(tokenUri, {
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
  console.log('receipt', receipt);
  ret.confirmations = confirmations;
  if (confirmations > 0) {
    console.log('KIP37 contract deploy... confirmed!!', contract);
    const { address } = contract;
    ret.address = address;

    // 신규 스마트코트랙 주소 등 DB에 입력
  } else {
    ret.err = receipt;
    console.log(JSON.stringify(receipt));
  }
  return ret;
}
