import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/indexs`;

export const getCreatorData = (page, rowsPerPage) => {
  return axios
    .get(`${API_URL}?page=${page + 1}&perPage=${rowsPerPage}&level=creator`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

const creatorService = {
  getCreatorData,
};

export default creatorService;
