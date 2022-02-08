import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api//collection/detail`;

export const getDetailCollection = (id) => {
  return axios
    .get(`${API_URL}/id`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

const collectionsService = {
  getDetailCollection,
};

export default collectionsService;
