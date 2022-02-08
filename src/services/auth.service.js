import axios from 'axios';
import * as yup from 'yup';

export const validationSchema = yup.object({
  full_name: yup.string('Enter your name').required('Name is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  level: yup.string('Enter your name').required('Name is required'),
});

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
