import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/`;

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken || null);
        localStorage.setItem('refreshToken', response.data.data.refreshToken || null);
        localStorage.setItem('infor', JSON.stringify(response.data.data.infor) || null);
      }

      return response.data;
    });
};

// Todo logout
const logout = () => {
  // localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
