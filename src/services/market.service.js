import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/market`;

export const getMarketCollectionData = (categoryKeyword) => {
  const category = categoryKeyword === 'all' ? '' : categoryKeyword;
  return axios
    .get(`${API_URL}/indexs?category=${category}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => (error.response.status === 401 ? authService.logout() : console.log(error)));
};

export const getNFTsByCollectionId = (id) => {
  let url = `${process.env.REACT_APP_API_SERVER}/admin-api/collection/detail/${id}`;
  return (
    axios
      // .get(`${API_URL}/indexs${pageQuery}${subQuery}`, { headers: authHeader() })
      .get(url)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => (error.response.status === 401 ? authService.logout() : console.log(error)))
  );
};

export const nftDetail = (id) => {
  return axios
    .get(`${process.env.REACT_APP_API_SERVER}/admin-api/nft/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error.response?.status === 401 ? authService.logout() : console.log(error);
    });
};

export const saleList = (nftId, page, size) => {
  return  axios
    .get(`${API_URL}/saleList/${nftId}?page=${page}&size=${size}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error.response?.status === 401 ? authService.logout() : console.log(error);
    });
}

export const sellUserNft = (
  seller,
  quantity,
  price,
  quote,
  collectionId,
  nftId,
  tokenId,
  serialIds
) => {
  const data = {
    seller,
    quantity,
    price,
    quote,
    collectionId,
    nftId,
    tokenId,
    serialIds
  };
  console.log(data);
  return axios.post(`${API_URL}/sellNft`, data, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error.response?.status === 401 ? authService.logout() : console.log(error);
    });
};

export const getMarketNFTData = (
  type,
  page,
  rowsPerPage,
  searchKeyword,
  collectionId,
  creator_id,
) => {
  let url = `${process.env.REACT_APP_API_SERVER}/admin-api/nft/indexs?type=${type}&page=${
    page + 1
  }&perPage=${rowsPerPage}&onchain=true`;
  url = searchKeyword !== undefined ? `${url}&keyword=${searchKeyword}` : url;
  url = collectionId !== undefined ? `${url}&collection_id=${collectionId}` : url;
  url = creator_id !== undefined ? `${url}&creator_id=${creator_id}` : url;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error.response?.status === 401 ? authService.logout() : console.log(error);
    });
};

export const selectUserSerials = (nft_id, buyer, seller, amount, sale_id) => {
  const url = `${API_URL}/select-user-serials?nft_id=${nft_id}&buyer=${buyer}&seller=${seller}&amount=${amount}&sale_id=${sale_id}`;
  return axios
    .get(url, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error.response?.status === 401 ? authService.logout() : console.log(error);
    });
};

export const cancelBuyUserNft = (nft_id, tokenId, buyer, seller, sale_id) => {
  const url = `${API_URL}/cancel-buy-usernft?nft_id=${nft_id}&token_id=${tokenId}&buyer=${buyer}&seller=${seller}&sale_id=${sale_id}`;
  return axios
    .get(url, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error.response?.status === 401 ? authService.logout() : console.log(error);
    });
};

const marketService = { getMarketCollectionData, nftDetail, getMarketNFTData, sellUserNft, saleList, selectUserSerials, cancelBuyUserNft };

export default marketService;
