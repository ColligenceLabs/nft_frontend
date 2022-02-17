import * as yup from 'yup';

const airdropMintSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  creator_id: yup.string('Select creator').required('Creator is required'),
  collection: yup.string('Select collection').required('Collection is required'),
  content: yup.mixed().required('You need to provide a file'),
  amount: yup.number('Enter amount').required('Amount is required'),
  thumbnail: yup.mixed().required('You need to provide a file'),
  externalURL: yup.string('Enter externalURL').required('External URL is required'),
  description: yup.string('Enter description').required('Description is required'),
});

export default airdropMintSchema;
