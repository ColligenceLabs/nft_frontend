import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft`;

export const getNFTData = (page, rowsPerPage, searchKeyword, collectionId, creator_id) => {
  let url = `${API_URL}/indexs?page=${page + 1}&perPage=${rowsPerPage}&onchain=true`;
  url = searchKeyword !== undefined ? `${url}&keyword=${searchKeyword}` : url;
  url = collectionId !== undefined ? `${url}&collection_id=${collectionId}` : url;
  url = creator_id !== undefined ? `${url}&creator_id=${creator_id}` : url;
  return axios
    .get(url, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error.response.status == 401 ? authService.logout() : console.log(error);
    });
};

export const registerNFT = (formData) => {
  return axios
    .post(`${API_URL}/create`, formData, { headers: authHeader() })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => (error.response.status == 401 ? authService.logout() : console.log(error)));
};

export const deployNFT17 = (formData) => {
  return axios
    .post(`${API_URL}/deploy`, formData, { headers: authHeader() })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => (error.response.status == 401 ? authService.logout() : console.log(error)));
};

export const batchRegisterNFT = (formData) => {
  return axios
    .post(`${API_URL}/batchcreate`, formData, { headers: authHeader() })
    .catch((error) =>
      error.toString().indexOf('401') ? authService.logout() : console.log(error),
    );
};

export const setNftOnchain = (id) => {
  return axios
    .put(`${API_URL}/update-onchain/${id}`, { onchain: 'true' }, { headers: authHeader() })
    .catch((error) => (error.response.status == 401 ? authService.logout() : console.log(error)));
};
