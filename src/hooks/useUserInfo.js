import { useSelector } from 'react-redux';

const useUserInfo = () => {
  const { user } = useSelector((state) => state?.auth);

  if (user !== null) {
    return {
      id: user.infor.id,
      full_name: user.infor.full_name,
      level: user.infor.level,
      email: user.infor.email,
      image: user.infor.image,
      description: user.infor.description,
    };
  } else {
    return { id: null, full_name: null, level: null, email: null, image: null, description: null };
  }
};

export default useUserInfo;
