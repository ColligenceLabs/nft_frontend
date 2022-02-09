import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin`;

export const getAdminsData = (page, rowsPerPage) => {
  return axios
    .get(`${API_URL}/indexs?page=${page + 1}&perPage=${rowsPerPage}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const updateAdminsStatus = (id, status) => {
  return axios
    .put(
      `${API_URL}/update/${id}`,
      {
        status: status,
      },
      { headers: authHeader() },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

const adminsService = {
  getAdminsData,
  updateAdminsStatus,
};

export default adminsService;