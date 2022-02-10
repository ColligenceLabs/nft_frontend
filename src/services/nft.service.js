import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/nft`;

export const registerNFT = (formData) => {
  return axios.post(`${API_URL}/create`, formData, { headers: authHeader() });
};
