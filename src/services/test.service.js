import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/collection/`;

const getTestData = () => {
  const accessToken = localStorage.getItem('accessToken');
  return axios
    .get(API_URL + 'category', { headers: authHeader() })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
};

const testService = {
  getTestData,
};

export default testService;
