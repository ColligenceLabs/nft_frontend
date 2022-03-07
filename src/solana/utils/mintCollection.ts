import splitAddress from '../../utils/splitAddress';
import { Creator, useConnection, useConnectionConfig } from '@colligence/metaplex-common';
import { useWallet } from '@solana/wallet-adapter-react';
import { mintNFT } from '../actions/nft';
import { useState } from 'react';

export interface MetaForm {
  name: string;
  symbol: string;
  collection: string;
  description: string;
  sellerFeeBasisPoints: number;
  image: File[];
  animation_url: string;
  attributes: [];
  external_url: string;
  properties: {
    files: [
      {
        uri: string;
        type: string;
      },
    ];
    category: string;
  };
}

export const mintCollection = async (metaInfo: MetaForm, maxSupply: number, share: number) => {
  const wallet = useWallet();
  const connection = useConnection();
  const { endpoint } = useConnectionConfig();

  const [nftCreateProgress, setNFTcreateProgress] = useState(0);

  // TODO : artCreate/index.tsx 1091 라인 참고
  // const creators = new Creator({
  //   address: '6u76n3P6e6YLTMA5TSPNjFkuNGq9r4JHYUEtfa4kC8WL',
  //   share: 100,
  //   verified: true,
  // });
  const fixedCreators = [
    {
      key: wallet?.publicKey?.toBase58(),
      label: splitAddress(wallet?.publicKey?.toBase58()),
      value: wallet?.publicKey?.toBase58(),
    },
  ];
  // TODO : artCreate/index.tsx 1091 라인 참고하여 share 값 계산 등등 처리할 것
  const creatorStructs: Creator[] = [...fixedCreators].map(
    (c) =>
      new Creator({
        address: c.value ?? '',
        verified: c.value === wallet.publicKey?.toBase58(),
        share, // 100
        // share:
        //   royalties.find(r => r.creatorKey === c.value)?.amount ||
        //   Math.round(100 / royalties.length),
      }),
  );

  const metadata = {
    // name: attributes.name,
    // symbol: attributes.symbol,
    // creators: attributes.creators,
    // collection: attributes.collection,
    // description: attributes.description,
    // sellerFeeBasisPoints: attributes.seller_fee_basis_points,
    // image: attributes.image,
    // animation_url: attributes.animation_url,
    // attributes: attributes.attributes,
    // external_url: attributes.external_url,
    // properties: {
    //   files: attributes.properties.files,
    //   category: attributes.properties?.category,
    // },
    name: 'Klimit',
    symbol: 'KMT',
    creators: creatorStructs,
    collection: '',
    description: 'Klimt Paintings',
    sellerFeeBasisPoints: 500,
    image: metaInfo.image[0].name,
    animation_url: undefined,
    attributes: undefined,
    external_url: '',
    properties: {
      files: [{ uri: metaInfo.image[0].name, type: metaInfo.image[0].type }],
      category: 'image',
    },
  };

  // const files = [];
  // files.push(metaInfo.image[0]);

  try {
    const _nft = await mintNFT(
      connection,
      wallet,
      endpoint.name,
      // files,
      metaInfo.image,
      metadata,
      setNFTcreateProgress,
      // attributes.properties?.maxSupply,
      maxSupply,
    );
  } catch (e: any) {
    console.log(e.message);
  } finally {
    console.log('Success...');
  }
};
