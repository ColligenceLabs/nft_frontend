import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/`;

export const register = (formData) => {
  return axios.post(API_URL + 'register', formData);
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.status === 1) {
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
