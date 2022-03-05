import { mintEditionsToWallet } from '../../solana/actions/mintEditionsIntoWallet';
import { useArt } from '../../solana/hooks';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection, useUserAccounts } from '@colligence/metaplex-common';

// TODO : Zero NFT Mint 시에 retrun 된 ID
// 예 : 5PC1VdgyhoETpDPwvvHyjv2K5QkCWcuk1vSNJ2XcFrA
export const mintEdition = async (id: string, amount: number) => {
  const wallet = useWallet();
  const connection = useConnection();
  const { accountByMint } = useUserAccounts();
  const art = useArt(id);

  const artMintTokenAccount = accountByMint.get(art.mint!);
  const walletPubKey = wallet?.publicKey?.toString() || '';

  // TODO : GUI에서 입력받을 값... 발행 수량 값
  const editions = amount;
  const editionNumber = undefined;

  try {
    await mintEditionsToWallet(
      art,
      wallet!,
      connection,
      artMintTokenAccount!,
      editions,
      walletPubKey,
      editionNumber,
    );
  } catch (e) {
    console.error(e);
  } finally {
    console.log('Success...');
  }
};
