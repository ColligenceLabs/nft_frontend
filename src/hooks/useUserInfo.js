import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getCreatorDataById } from '../services/creator.service';

const useUserInfo = () => {
  const { user } = useSelector((state) => state?.auth);

  const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/detail/${user.infor.id}`;
  const { data } = useSWR(API_URL, () => getCreatorDataById(user.infor.id));

  if (data && data.data !== undefined) {
    return {
      id: data.data._id,
      full_name: data.data.full_name,
      level: data.data.level,
      email: data.data.email,
      image: data.data.image,
      description: data.data.description,
    };
  } else {
    return { id: null, full_name: null, level: null, email: null, image: null, description: null };
  }
};

export default useUserInfo;
