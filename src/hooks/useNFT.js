import { useCallback, useState } from 'react';
import request from 'request';
import { parseUnits } from 'ethers/lib/utils';
import testMeta from '../config/constants/test.json';
import { BigNumber } from 'ethers';
import useActiveWeb3React from './useActiveWeb3React';
import fs from 'fs';
import { IPFS_URL, ALT_URL } from '../config/constants/consts';
import { create } from 'ipfs-http-client';
import { setNftOnchain, setNftTransfered } from '../services/nft.service';

// add 10%
export function calculateGasMargin(value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

const addToIPFS = async function (file) {
  // console.log("start file upload to ipfs...")
  const auth =
    'Basic ' +
    Buffer.from('24EBv9Z978FDIDn74tjbKZV8ihS' + ':' + '4a4d9b8d905d38a7e3a3caa7fa0e35f4').toString(
      'base64',
    );
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
  const result = await client.add(file);
  return result;
};

export const mkDirIPFS = async function (directory) {
  // console.log("start file upload to ipfs...")
  const auth =
    'Basic ' +
    Buffer.from('24EBv9Z978FDIDn74tjbKZV8ihS' + ':' + '4a4d9b8d905d38a7e3a3caa7fa0e35f4').toString(
      'base64',
    );
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
  // const dirStr = `/${directory}`;
  const dirStr = `/${directory.toLowerCase()}`;
  // const result = await client.files.mkdir(directory);
  // const result = await client.files.mkdir(dirStr);
  // TODO : files.mkdir return 403 forbidden error... need to fix it
  const result = 'talken-nft';
  return result;
};

const useNFT = (contract, account) => {
  // TODO: library 를 dependencies 에 추가하지 않으먄 같은 에러가 발생함.
  const [isMinting, setIsMinting] = useState();
  const [isTransfering, setIsTransfering] = useState();

  const { library } = useActiveWeb3React();

  // const createNFT = useCallback(
  //   async (mintData) => {
  //     console.log('====>', mintData);
  //     // content ipfs 업로드
  //     let result = await addToIPFS(mintData.contentFile);
  //     console.log('11111', result);
  //     // thumbnail 서버 업로드
  //
  //     // tokenId가 중복되지 않도록 처리해야함. 발행할 tokenId를 자동으로 가지고 오기 위한 API 필요
  //     const tokenId = 3;
  //
  //     // form json 파일 생성
  //     let imgName = mintData.content.split('.');
  //     const metadata = {
  //       name: mintData.name,
  //       description: mintData.description,
  //       image: IPFS_URL + result.path,
  //       alt_url: ALT_URL + result.path + '.' + imgName[imgName.length - 1],
  //       content_Type: imgName[imgName.length - 1],
  //       cid: result.path,
  //       tokenId: tokenId,
  //       total_minted: '',
  //       external_url: mintData.external_url,
  //       attributes: [],
  //       minted_by: 'securit',
  //       thumbnail: '',
  //       creator_name: mintData.creator.name,
  //       creator_icon: mintData.creator.image,
  //       category: [],
  //     };
  //
  //     if (typeof mintData.thumbnailFile !== 'undefined' && mintData.thumbnail !== '') {
  //       let thumbName = mintData.thumbnail.split('.');
  //       // let thumbnailInput = my_thumbnail.filename;
  //       // let thumbnailOutput = result.Hash + '_thumbnail.' + thumbName[thumbName.length -1];
  //       // await imageRename(consts.UPLOAD_PATH + thumbnailInput, consts.UPLOAD_PATH + 'thumbnail/' + thumbnailOutput);
  //       metadata.thumbnail =
  //         ALT_URL + 'thumbnail/' + result.Hash + '_thumbnail.' + thumbName[thumbName.length - 1];
  //     }
  //     console.log('22222', metadata);
  //
  //     // ipfs json 업로드
  //     let metadata_ipfs_link = await addToIPFS(JSON.stringify(metadata));
  //     console.log('33333', metadata_ipfs_link);
  //     // gasLimit 계산?
  //     const gasPrice = parseUnits('25', 'gwei').toString();
  //     console.log('=====>', contract);
  //     // mint 요청
  //     const gasLimit = await contract.estimateGas.mintWithTokenURI(
  //       '0x1716c4d49e9d81c17608cd9a45b1023ac9df6c73',
  //       tokenId,
  //       IPFS_URL + metadata_ipfs_link.path,
  //     );
  //     console.log(gasPrice, contract);
  //     const tx = await contract.mintWithTokenURI(
  //       '0x1716c4d49e9d81c17608cd9a45b1023ac9df6c73',
  //       tokenId,
  //       IPFS_URL + metadata_ipfs_link.path,
  //       {
  //         from: account,
  //         gasPrice,
  //         gasLimit: calculateGasMargin(gasLimit),
  //       },
  //     );
  //     let receipt;
  //     try {
  //       receipt = await tx.wait();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     console.log(tx, receipt);
  //
  //     // rest api 호출(db 저장)
  //   },
  //   [library, account, mintData],
  // );

  const mintNFT17 = useCallback(
    async (tokenId, tokenUri, nftId) => {
      setIsMinting(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      let tx;

      // gasLimit 계산
      const gasLimit = await contract.estimateGas.mintWithTokenURI(account, tokenId, tokenUri);
      console.log(gasPrice, contract);

      // mint 요청
      tx = await contract.mintWithTokenURI(account, tokenId, tokenUri, {
        from: account,
        gasPrice,
        gasLimit: calculateGasMargin(gasLimit),
        // gasLimit: 2000000,
      });

      // receipt 대기
      let receipt;
      try {
        receipt = await tx.wait();
        if (receipt.status === 1) {
          await setNftOnchain(nftId);
        }
      } catch (e) {
        console.log(e);
      }
      console.log(tx, receipt);
      await setIsMinting(false);
    },
    [library, account, contract],
  );

  const mintNFT37 = useCallback(
    async (tokenId, amount, tokenUri, nftId, contractType) => {
      setIsMinting(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      let tx;

      // gasLimit 계산
      const gasLimit = await contract.estimateGas.create(tokenId, amount, tokenUri);
      console.log(gasPrice, contract);

      // mint 요청
      tx = await contract.create(tokenId, amount, tokenUri, {
        from: account,
        gasPrice,
        gasLimit: calculateGasMargin(gasLimit),
        // gasLimit: 2000000,
      });

      // receipt 대기
      let receipt;
      try {
        receipt = await tx.wait();
        if (receipt.status === 1) {
          await setNftOnchain(nftId);
        }
      } catch (e) {
        console.log(e);
      }
      console.log(tx, receipt);
      await setIsMinting(false);
    },
    [library, account, contract],
  );

  const transferNFT = useCallback(
    // KIP17 amount should be 1 always.
    // NIP37 amount should be between 1 to total supply.
    async (tokenId, to, amount, nftId, contractType) => {
      setIsTransfering(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      let tx;

      if (contractType === 'KIP17') {
        // gasLimit 계산
        const gasLimit = await contract.estimateGas.safeTransferFrom(account, to, tokenId);
        console.log(gasPrice, contract);

        // transfer 요청
        tx = await contract.safeTransferFrom(account, to, tokenId, {
          from: account,
          gasPrice,
          gasLimit: calculateGasMargin(gasLimit),
          // gasLimit: 2000000,
        });
      } else {
        // gasLimit 계산
        const gasLimit = await contract.estimateGas.safeTransferFrom(account, to, tokenId, amount);
        console.log(gasPrice, contract);

        // transfer 요청
        tx = await contract.safeTransferFrom(account, to, tokenId, amount, {
          from: account,
          gasPrice,
          gasLimit: calculateGasMargin(gasLimit),
          // gasLimit: 2000000,
        });
      }

      // receipt 대기
      let receipt;
      try {
        receipt = await tx.wait();
        if (receipt.status === 1) {
          await setNftTransfered(nftId, amount);
        }
      } catch (e) {
        console.log(e);
      }
      console.log(tx, receipt);
      await setIsTransfering(false);
    },
    [library, account, contract],
  );

  // return { createNFT, mintNFT };
  return { mintNFT17, mintNFT37, transferNFT, isMinting, isTransfering };
};

export default useNFT;
