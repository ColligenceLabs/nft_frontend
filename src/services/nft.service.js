import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft`;

export const getNFTData = (page, rowsPerPage) => {
  return axios
    .get(`${API_URL}/indexs?page=${page + 1}&perPage=${rowsPerPage}&onchain=false`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const registerNFT = (formData) => {
  return axios.post(`${API_URL}/create`, formData, { headers: authHeader() });
};
