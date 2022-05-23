import Caver from 'caver-js';

export async function signMessage(library, account, flag) {
  try {
    const message = 'Welcome to Taal NFT Marketplace!';
    let sign;

    if (flag === 'metamask') {
      sign = await library.provider.request({
        method: 'personal_sign',
        params: [message, account, 'Random text'],
      });
    } else if (flag === 'kaikas') {
      const caver = new Caver(window.klaytn);
      const address = window.klaytn.selectedAddress;
      sign = await caver.klay.sign(message, address);
    }

    return sign;
  } catch (e) {
    return new Error(e.message);
  }
}
