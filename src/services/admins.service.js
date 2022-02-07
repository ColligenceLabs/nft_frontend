import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/indexs`;

export const getAdminsData = () => {
  return axios
    .get(API_URL, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

const adminsService = {
  getAdminsData,
};

export default adminsService;
