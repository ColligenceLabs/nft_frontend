import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/`;

export const register = (formData) => {
  return (
    axios
      .post(API_URL + 'register', formData)
      // .catch((error) =>
      //   error.toString().indexOf('401') ? (window.location.href = '/auth/login') : console.log(error),
      // );
      .catch((error) => (error.toString().indexOf('401') ? logout() : console.log(error)))
  );
};

const login = (email, password) => {
  return (
    axios
      .post(API_URL + 'login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status === 1) {
          localStorage.setItem('user', JSON.stringify(response.data.data || null));
        }
        return response.data;
      })
      // .catch((error) =>
      //   error.toString().indexOf('401') ? (window.location.href = '/auth/login') : console.log(error),
      // );
      .catch((error) => (error.toString().indexOf('401') ? logout() : console.log(error)))
  );
};

// Todo logout
const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/auth/login';
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
