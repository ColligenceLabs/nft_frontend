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
        localStorage.setItem('user', JSON.stringify(response.data.data || null));
      }

      return response.data;
    });
};

// Todo logout
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
