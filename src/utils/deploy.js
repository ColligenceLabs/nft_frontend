import { kip17Data, kip37Data } from 'src/contracts';

async function deployKIP17(name, symbol, library) {
  // console.log('application : ' + JSON.stringify(application));
  // console.log('account : ' + account);
  // console.log('library : ' + library);

  const factory = new ContractFactory(
    kip17Data.abi,
    kip17Data.bytecode,
    library.getSigner(account),
  );

  // console.log('taalDeploy start!');
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

  console.log('test========');
  const receipt = await contract.deployTransaction.wait().catch(function (err) {
    console.log(err);
    ret.err = err;
  });
  if (!!ret.err) return ret;
  const { confirmations } = receipt;
  console.log('receipt', receipt);
  ret.confirmations = confirmations;
  if (confirmations > 0) {
    console.log('fixedSwap contract deploy... confirmed!!', contract);
    const { address } = contract;
    ret.address = address;
  } else {
    ret.err = receipt;
    console.log(JSON.stringify(receipt));
  }
  return ret;
}

async function deployKIP17(application, account, library) {
  // console.log('application : ' + JSON.stringify(application));
  // console.log('account : ' + account);
  // console.log('library : ' + library);

  const factory = new ContractFactory(
    kip17Data.abi,
    kip17Data.bytecode,
    library.getSigner(account),
  );

  // console.log('taalDeploy start!');
  const ret = {};
  const contract = await factory
    .deploy('DDVerse', 'DDC', {
      gasLimit: 7000000,
    })
    .catch(function (err) {
      console.log(err);
      ret.err = err;
    });

  if (!!ret.err) return ret;

  console.log('test========');
  const receipt = await contract.deployTransaction.wait().catch(function (err) {
    console.log(err);
    ret.err = err;
  });
  if (!!ret.err) return ret;
  const { confirmations } = receipt;
  console.log('receipt', receipt);
  ret.confirmations = confirmations;
  if (confirmations > 0) {
    console.log('fixedSwap contract deploy... confirmed!!', contract);
    const { address } = contract;
    ret.address = address;
  } else {
    ret.err = receipt;
    console.log(JSON.stringify(receipt));
  }
  return ret;
}

async function deployKIP17(name, symbol, library) {
  // console.log('application : ' + JSON.stringify(application));
  // console.log('account : ' + account);
  // console.log('library : ' + library);

  // TODO: class -> hooks 사용으로 변환 좀 ...
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
    console.log('KIP17 contract deploy... confirmed!!', contract);
    const { address } = contract;
    ret.address = address;
  } else {
    ret.err = receipt;
    console.log(JSON.stringify(receipt));
  }
  return ret;
}

async function deployKIP37(tokenUri, account, library) {
  // console.log('application : ' + JSON.stringify(application));
  // console.log('account : ' + account);
  // console.log('library : ' + library);

  // TODO: class -> hooks 사용으로 변환 좀 ...
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
  } else {
    ret.err = receipt;
    console.log(JSON.stringify(receipt));
  }
  return ret;
}
