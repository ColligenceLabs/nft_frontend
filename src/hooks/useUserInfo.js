import { useSelector } from 'react-redux';

const useUserInfo = () => {
  const {
    user: {
      infor: { id, full_name, level, email, image, description },
    },
  } = useSelector((state) => state.auth);

  return { id, full_name, level, email, image, description };
};

export default useUserInfo;
