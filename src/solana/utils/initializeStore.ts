import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection, WhitelistedCreator } from '@colligence/metaplex-common';
import { saveAdmin } from '../actions/saveAdmin';

export const initializeStore = async () => {
  const wallet = useWallet();
  const connection = useConnection();

  if (!wallet.publicKey) {
    return;
  }

  await saveAdmin(connection, wallet, false, [
    new WhitelistedCreator({
      address: wallet.publicKey.toBase58(),
      activated: true,
    }),
  ]);
};
