import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/collection`;

export const getCollectionData = (page, rowsPerPage, id) => {
  const pageQuery = page === undefined ? '' : `?page=${page + 1}&perPage=${rowsPerPage}`;
  const subQuery = id === undefined ? '' : `&creator_id=${id}`;

  return axios
    .get(`${API_URL}/indexs${pageQuery}${subQuery}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => (error.response.status == 401 ? authService.logout() : console.log(error)));
};

export const getDetailCollection = () => {
  return axios
    .get(`${API_URL}/detail/id`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })

    .catch((error) => (error.response.status == 401 ? authService.logout() : console.log(error)));
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
    .catch((error) => (error.response.status == 401 ? authService.logout() : console.log(error)));
};

const collectionsService = {
  getDetailCollection,
  createCollection,
  getCollectionData,
  getCollectionsByCreatorId,
};

export default collectionsService;
