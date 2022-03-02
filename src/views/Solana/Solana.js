import React, { useCallback, useMemo, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@colligence/metaplex-common';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';

const StyledButton = styled(Button)`
  width: 100px;
`;

const Solana = () => {
  const [isInitalizingStore, setIsInitalizingStore] = useState(false);

  const { wallet, select } = useWallet();
  const { setVisible } = useWalletModal();
  // const connect = useCallback(
  //   () => (wallet.wallet ? wallet.connect().catch() : setVisible(true)),
  //   [wallet.wallet, wallet.connect, setVisible],
  // );

  const phatomWallet = useMemo(() => getPhantomWallet(), []);

  const onInitStore = async () => {
    console.log('Init store clicked');
  };

  const onCreate = async () => {
    console.log('Create clicked');
  };

  const onSell = async () => {
    console.log('Sell clicked');
  };

  const initializeStore = async () => {
    if (!wallet.publicKey) {
      return;
    }

    setIsInitalizingStore(true);

    await saveAdmin(connection, wallet, false, [
      new WhitelistedCreator({
        address: wallet.publicKey.toBase58(),
        activated: true,
      }),
    ]);

    // TODO: process errors

    await setStoreForOwner(undefined);
    await setStoreForOwner(wallet.publicKey.toBase58());

    history.push('/admin');
  };

  return (
    <div>
      <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
          {/* <StyledButton variant="contained" onClick={() => connect()}> */}
          {/*  Connect*/}
          {/* </StyledButton> */}
          <StyledButton
            variant="contained"
            onClick={() => {
              console.log(phatomWallet.name);
              select(phatomWallet.name);
            }}
          >
            Connect
          </StyledButton>
          <StyledButton variant="contained" onClick={onInitStore}>
            Init Store
          </StyledButton>
          <StyledButton variant="contained" onClick={onCreate}>
            Create
          </StyledButton>
          <StyledButton variant="contained" onClick={onSell}>
            Sell
          </StyledButton>
        </div>
      </Grid>
    </div>
  );
};

export default Solana;
