export async function verifyMessage(library, sign, address, wallet) {
  const message = 'Welcome to Taal NFT Marketplace!';
  let signer;

  if (wallet === 'netamask') {
    signer = library.provider.eth.accounts.recover(message, sign);
  } else if (wallet === 'kaikas') {
    signer = await caver.klay.ecRecover(message, sign);
  }

  console.log(signer);
  return signer;
}
