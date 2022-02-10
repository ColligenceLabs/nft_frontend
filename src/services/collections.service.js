import axios from 'axios';
import authHeader from './auth-header';
import * as yup from 'yup';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/collection`;

export const getCollectionData = (page, rowsPerPage) => {
  return axios
    .get(`${API_URL}/indexs?page=${page + 1}&perPage=${rowsPerPage}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const getDetailCollection = () => {
  return axios
    .get(`${API_URL}/detail/id`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const createCollection = (formData) => {
  console.log('===> ', formData);
  return axios.post(`${API_URL}/create`, formData, { headers: authHeader() });
};

export const getCollectionsByCreatorId = (id) => {
  return axios
    .get(`${API_URL}/creator/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

const collectionsService = {
  getDetailCollection,
  createCollection,
  getCollectionData,
  getCollectionsByCreatorId,
};

export default collectionsService;
