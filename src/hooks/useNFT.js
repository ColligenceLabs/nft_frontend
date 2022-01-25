import { useCallback } from 'react';
import request from 'request';
import { parseUnits } from 'ethers/lib/utils'
import testMeta from '../config/constants/test.json'

const addJsonToIPFS = async function (metadata) {
  // console.log("start json upload to ipfs...")
  const auth =
    'Basic ' +
    Buffer.from('adb9c847d7114ee7bf83995e8f22e098' + ':' + 'b4619e7f713241ea8732a30405cb482e').toString(
      'base64',
    );

  const options = {
    method: 'GET',
    url: 'https://ipfs.infura.io:5001/api/v0/add',
    headers: {
      Authorization: auth,
    },
    formData: {
      file: JSON.stringify(metadata),
    },
  };

  let getResponse = await new Promise(function (resolve, reject) {
    request(options, async function (error, response) {
      if (!error && response.statusCode == 200) {
        // console.log("add json to ipfs success")
        resolve(response.body);
      } else {
        reject(error);
      }
    });
  });

  getResponse = JSON.parse(getResponse);
  return getResponse;
}

const useNFT = (contract) => {
  const createNFT = useCallback( async () => {
    // content ipfs 업로드

    // thumbnail 서버 업로드

    // form json 파일 생성
    console.log('testMeta ', testMeta);

    // ipfs 업로드
    // let metadata_ipfs_link = await addJsonToIPFS(testMeta)

    // gasLimit 계산?

    const gasPrice = parseUnits('25', 'gwei').toString();
    // mint 요청
    // const tx = await contract.mint(to, tokenId, { from: account, gasPrice, gasLimit: calculateGasMargin(gasLimit) });
    // let receipt;
    // try {
    //   receipt = await tx.wait();
    // } catch (e) {
    //   console.log(e);
    // }
    console.log(gasPrice, contract);

    // rest api 호출(db 저장)
  }, [])
  return {createNFT};
}

export default useNFT;