import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection, useStore, useWalletModal } from '@colligence/metaplex-common';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { saveAdmin } from '../../solana/actions/saveAdmin';
import { WhitelistedCreator } from '@colligence/metaplex-common/dist/lib/models/metaplex/index';
import { MetadataCategory, useConnectionConfig } from '@colligence/metaplex-common';
import { mintNFT } from '@colligence/metaplex-common/dist/lib/contracts/token';

const StyledButton = styled(Button)`
  width: 100px;
`;

const Solana = () => {
  const [isInitalizingStore, setIsInitalizingStore] = useState(false);

  const [attributes, setAttributes] = useState({
    name: '',
    symbol: '',
    collection: '',
    description: '',
    external_url: '',
    image: '',
    animation_url: undefined,
    attributes: undefined,
    seller_fee_basis_points: 0,
    creators: [],
    properties: {
      files: [],
      category: MetadataCategory.Image,
    },
  });
  const [isMinting, setMinting] = useState(false);

  const { endpoint } = useConnectionConfig();
  const [nft, setNft] = useState(undefined);
  const [alertMessage, setAlertMessage] = useState();
  const [files, setFiles] = useState([]);
  const [nftCreateProgress, setNFTcreateProgress] = useState(0);

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

  const mint = async () => {
    const metadata = {
      name: attributes.name,
      symbol: attributes.symbol,
      creators: attributes.creators,
      collection: attributes.collection,
      description: attributes.description,
      sellerFeeBasisPoints: attributes.seller_fee_basis_points,
      image: attributes.image,
      animation_url: attributes.animation_url,
      attributes: attributes.attributes,
      external_url: attributes.external_url,
      properties: {
        files: attributes.properties.files,
        category: attributes.properties?.category,
      },
    };
    setMinting(true);

    try {
      const _nft = await mintNFT(
        connection,
        wallet,
        endpoint.name,
        files,
        metadata,
        setNFTcreateProgress,
        attributes.properties?.maxSupply,
      );

      if (_nft) setNft(_nft);
      setAlertMessage('');
    } catch (e) {
      setAlertMessage(e.message);
    } finally {
      setMinting(false);
    }
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
      <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right" gap="1rem">
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
          <StyledButton variant="contained" onClick={mint}>
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
