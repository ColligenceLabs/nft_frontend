import { useCallback, useState } from 'react';
import request from 'request';
import { parseUnits } from 'ethers/lib/utils';
import testMeta from '../config/constants/test.json';
import { BigNumber } from 'ethers';
import useActiveWeb3React from './useActiveWeb3React';
import fs from 'fs';
import { IPFS_URL, ALT_URL } from '../config/constants/consts';
import { create } from 'ipfs-http-client';
import { setNftOnchain, setNftTransferData, setNftTransfered } from '../services/nft.service';

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
  const result = await client.files.mkdir(dirStr);
  // TODO : files.mkdir return 403 forbidden error... need to fix it
  return result;
};

const useNFT = (contract, kasContract, account) => {
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

  const mintNFT17WithKaikas = useCallback(
    async (tokenId, tokenUri, nftId) => {
      setIsMinting(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      let tx;
      // gasLimit 계산
      const gasLimit = await kasContract.methods
        .mintWithTokenURI(account, tokenId, tokenUri)
        .estimateGas({
          from: account,
        });
      console.log(gasPrice, BigNumber.from(gasLimit));

      // mint 요청
      tx = await kasContract.methods
        .mintWithTokenURI(account, tokenId, tokenUri)
        .send({
          from: account,
          gasPrice,
          gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
        })
        .catch((err) => {
          console.log('mintNFT17WithKaikas error', err);
        });

      // receipt 대기
      try {
        if (tx?.status) {
          await setNftOnchain(nftId);
        }
      } catch (e) {
        console.log(e);
      }
      console.log(tx);
      await setIsMinting(false);
    },
    [library, account, kasContract],
  );

  const mintNFT17 = useCallback(
    async (tokenId, tokenUri, nftId) => {
      setIsMinting(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      let tx;

      // gasLimit 계산
      const gasLimit = await contract.estimateGas.mintWithTokenURI(account, tokenId, tokenUri);
      console.log(gasPrice, gasLimit, contract);

      // mint 요청
      try {
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
      } catch (e) {
        console.log(e);
        await setIsMinting(false);
      }
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
      try {
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
      } catch (e) {
        console.log(e);
        await setIsMinting(false);
      }
    },
    [library, account, contract],
  );

  const mintNFT37WithKaikas = useCallback(
    async (tokenId, amount, tokenUri, nftId, contractType) => {
      setIsMinting(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      // gasLimit 계산
      const gasLimit = await kasContract
        .create(tokenId, amount, tokenUri)
        .estimateGas({ from: account });

      console.log(gasPrice, gasLimit);

      // mint 요청
      const tx = await kasContract.create(tokenId, amount, tokenUri).send({
        from: account,
        gasPrice,
        gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
        // gasLimit: 2000000,
      });

      try {
        if (tx?.status) {
          await setNftOnchain(nftId);
        }
      } catch (e) {
        console.log(e);
      }
      console.log(tx);
      await setIsMinting(false);
    },
    [library, account, kasContract],
  );

  const transferNFT = useCallback(
    // KIP17 amount should be 1 always.
    // NIP37 amount should be between 1 to total supply.
    async (tokenId, to, amount, nftId, contractType) => {
      setIsTransfering(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      let tx;
      let gasLimit;

      if (contractType === 'KIP17') {
        try {
          // gasLimit 계산
          // TODO : TypeError: contract.estimateGas.safeTransferFrom is not a function
          // const gasLimit = await contract.estimateGas.safeTransferFrom(account, to, tokenId, '0x');
          gasLimit = await contract.estimateGas.transferFrom(account, to, tokenId);
          console.log(gasPrice, contract);
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'estimateGas transferFrom failed'];
        }

        try {
          // transfer 요청
          // tx = await contract.safeTransferFrom(account, to, tokenId, '0x', {
          tx = await contract.transferFrom(account, to, tokenId, {
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(gasLimit),
            // gasLimit: 2000000,
          });
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'transferFrom failed'];
        }
      } else {
        try {
          // gasLimit 계산
          gasLimit = await contract.estimateGas.safeTransferFrom(
            account,
            to,
            tokenId,
            amount,
            '0x',
          );
          console.log(gasPrice, contract);
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'estimateGas safeTransferFrom failed'];
        }

        try {
          // transfer 요청
          tx = await contract.safeTransferFrom(account, to, tokenId, amount, '0x', {
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(gasLimit),
            // gasLimit: 2000000,
          });
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'safeTransferFrom failed'];
        }
      }

      // receipt 대기
      let receipt;
      let errMessage;
      try {
        receipt = await tx.wait();
        if (receipt.status === 1) {
          // TODO : create serial 및 transaction 엔트리...
          // await setNftTransfered(nftId, amount);  --> setNftTransferData 여기서 처리
          await setNftTransferData(nftId, to, amount, receipt.transactionHash);
        }
      } catch (e) {
        console.log(e);
        errMessage = e.message;
      }
      console.log(tx, receipt);
      await setIsTransfering(false);
      return [receipt?.status, errMessage];
    },
    [library, account, contract],
  );

  const transferNFTWithKaikas = useCallback(
    // KIP17 amount should be 1 always.
    // NIP37 amount should be between 1 to total supply.
    async (tokenId, to, amount, nftId, contractType) => {
      setIsTransfering(true);
      const gasPrice = parseUnits('25', 'gwei').toString();

      console.log('====', kasContract);
      let tx;
      let gasLimit;

      if (contractType === 'KIP17') {
        try {
          // gasLimit 계산
          // TODO : TypeError: contract.estimateGas.safeTransferFrom is not a function
          // const gasLimit = await contract.estimateGas.safeTransferFrom(account, to, tokenId, '0x');
          gasLimit = await kasContract.methods.transferFrom(account, to, tokenId).estimateGas();
          console.log(gasPrice, contract);
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'estimateGas transferFrom failed'];
        }

        try {
          // transfer 요청
          // tx = await contract.safeTransferFrom(account, to, tokenId, '0x', {
          tx = await kasContract.methods.transferFrom(account, to, tokenId).send({
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(BigNumber.from(gasLimit)),
            // gasLimit: 2000000,
          });
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'transferFrom failed'];
        }
      } else {
        try {
          // gasLimit 계산
          gasLimit = await kasContract.methods
            .safeTransferFrom(account, to, tokenId, amount, '0x')
            .estimateGas();
          console.log(gasPrice, contract);
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'estimateGas safeTransferFrom failed'];
        }

        try {
          // transfer 요청
          tx = await kasContract.methods.safeTransferFrom(account, to, tokenId, amount, '0x').send({
            from: account,
            gasPrice,
            gasLimit: calculateGasMargin(gasLimit),
            // gasLimit: 2000000,
          });
        } catch (e) {
          console.log(e);
          await setIsTransfering(false);
          return [0, 'safeTransferFrom failed'];
        }
      }

      // receipt 대기
      let errMessage;
      try {
        if (tx.status === 1) {
          // TODO : create serial 및 transaction 엔트리...
          // await setNftTransfered(nftId, amount);  --> setNftTransferData 여기서 처리
          await setNftTransferData(nftId, to, amount, receipt.transactionHash);
        }
      } catch (e) {
        console.log(e);
        errMessage = e.message;
      }
      console.log(tx);
      await setIsTransfering(false);
      return [tx?.status, errMessage];
    },
    [library, account, kasContract],
  );

  // return { createNFT, mintNFT };
  return {
    mintNFT17,
    mintNFT17WithKaikas,
    mintNFT37,
    mintNFT37WithKaikas,
    transferNFT,
    transferNFTWithKaikas,
    isMinting,
    isTransfering,
  };
};

export default useNFT;
