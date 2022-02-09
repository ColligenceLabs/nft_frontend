import axios from 'axios';
import authHeader from './auth-header';
import * as yup from 'yup';

const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/collection`;

export const validationCollectionCreateSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  creator_id: yup.string('Select creator').required('Creator is required'),
  category: yup
    .array('Select category')
    .nullable()
    .label('Category')
    .min(1)
    .of(yup.string())
    .required('Category is required'),
  image: yup.mixed().required('You need to provide a file'),
});

export const getDetailCollection = () => {
  return axios
    .get(`${API_URL}/detail/id`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const createCollection = (formData) => {
  console.log('===> ', formData);
  return axios.post(`${API_URL}/create`, formData, { headers: authHeader() });
};

const collectionsService = {
  getDetailCollection,
  createCollection,
};

export default collectionsService;
