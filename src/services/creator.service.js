import axios from 'axios';
import authHeader from './auth-header';
import undefined from '@iconify-icons/carbon/undefined';
import authService from './auth.service';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/indexs`;

export const getCreatorData = (page, rowsPerPage) => {
  const subQuery =
    page === undefined
      ? `?level=creator`
      : `?page=${page + 1}&perPage=${rowsPerPage}&level=creator`;

  return (
    axios
      .get(`${API_URL}${subQuery}`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      })
      // .catch((error) =>
      //   error.toString().indexOf('401') ? (window.location.href = '/auth/login') : console.log(error),
      // );
      .catch((error) =>
        error.toString().indexOf('401') ? authService.logout() : console.log(error),
      )
  );
};

const creatorService = {
  getCreatorData,
};

export default creatorService;
