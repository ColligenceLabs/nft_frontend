import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/serial`;

export const getSerialsData = (page, rowsPerPage) => {
  let url = `${API_URL}/indexs?page=${page + 1}&perPage=${rowsPerPage}`;

  return axios
    .get(url, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      error.response.status === 401 ? (window.location.href = '/auth/login') : console.log(error),
    );
};

const serialsService = {
  getSerialsData,
};

export default serialsService;
