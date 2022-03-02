import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection, useStore, useWalletModal } from '@colligence/metaplex-common';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { saveAdmin } from '../../solana/actions/saveAdmin';
import { WhitelistedCreator } from '@colligence/metaplex-common/dist/lib/models/metaplex/index';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';

const StyledButton = styled(Button)`
  width: 100px;
`;

const Solana = () => {
  const [isInitalizingStore, setIsInitalizingStore] = useState(false);
  const [image, setImage] = useState(null);
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const connect = useCallback(
    () => (wallet.wallet ? wallet.connect().catch() : setVisible(true)),
    [wallet.wallet, wallet.connect, setVisible],
  );

  const phatomWallet = useMemo(() => getPhantomWallet(), []);

  const connection = useConnection();
  // const { store } = useMeta();
  const { setStoreForOwner } = useStore();

  // useEffect(() => {
  //   if (!process.env.NEXT_PUBLIC_STORE_OWNER_ADDRESS) {
  //     const getStore = async () => {
  //       if (wallet.publicKey) {
  //         const store = await setStoreForOwner(wallet.publicKey.toBase58());
  //         setStoreAddress(store);
  //       } else {
  //         setStoreAddress(undefined);
  //       }
  //     };
  //     getStore();
  //   }
  // }, [wallet.publicKey]);

  const onInitStore = async () => {
    console.log('Init store clicked');
    // await initializeStore();
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

    // history.push('/admin');
  };

  return (
    <div>
      {/*<Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">*/}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
        {/* <StyledButton variant="contained" onClick={() => connect()}> */}
        {/*  Connect*/}
        {/* </StyledButton> */}
        <StyledButton
          variant="contained"
          onClick={() => {
            console.log(phatomWallet.name);
            wallet.select(phatomWallet.name);
          }}
        >
          Phantom
        </StyledButton>
        <StyledButton variant="contained" onClick={connect}>
          Connect
        </StyledButton>
        <StyledButton variant="contained" onClick={initializeStore}>
          Init Store
        </StyledButton>
        <StyledButton variant="contained" onClick={onCreate}>
          Create
        </StyledButton>
        <StyledButton variant="contained" onClick={onSell}>
          Sell
        </StyledButton>
      </div>
      <div style={{ width: '500px', marginTop: '20px' }}>
        <CustomTextField
          id="thumbnailFiled"
          name="thumbnailFiled"
          variant="outlined"
          fullWidth
          size="small"
          value={image.name || ''}
          InputProps={{
            startAdornment: (
              <Button
                component="label"
                variant="contained"
                size="small"
                style={{ marginRight: '1rem' }}
              >
                <DriveFileMoveOutlinedIcon fontSize="small" />
                <input
                  id="thumbnail"
                  style={{ display: 'none' }}
                  type="file"
                  name="image"
                  onChange={(event) => {
                    setImage(event.currentTarget.files[0]);
                  }}
                />
              </Button>
            ),
          }}
        />
      </div>
      {/*</Grid>*/}
    </div>
  );
};

export default Solana;
