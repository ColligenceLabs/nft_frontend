import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/statistics`;

export const getSummaryPie = () => {
  let url = `${API_URL}/summarypie`;

  return axios
    .get(url, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      error.response.status === 401 ? (window.location.href = '/auth/login') : console.log(error),
    );
};

const dashboardService = {
  getSummaryPie,
};

export default dashboardService;
