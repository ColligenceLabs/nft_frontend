import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getCreatorDataById } from '../services/creator.service';

const useUserInfo = () => {
  // const { user } = useSelector((state) => state?.auth);
  const [user, setUser] = useState(useSelector((state) => state?.auth));

  useEffect(() => {
    if (user.user) setUser(user.user);
  }, [user]);

  // const API_URL = `${process.env.REACT_APP_API_SERVER}/admin-api/admin/detail/${user.infor.id}`;
  // const { data } = useSWR(API_URL, () => getCreatorDataById(user.infor.id));
  //
  // if (data && data.data !== undefined) {
  //   return {
  //     // id: data.data._id,
  //     // full_name: data.data.full_name,
  //     // level: data.data.level,
  //     // email: data.data.email,
  //     // image: data.data.image,
  //     // description: data.data.description,
  //   };
  // } else {
  //   return { id: null, full_name: null, level: null, email: null, image: null, description: null };
  // }

  if (user.infor) {
    return {
      // _id: user.infor._id,
      id: user.infor.id,
      full_name: user.infor.full_name,
      level: user.infor.level,
      email: user.infor.email,
      image: user.infor.image,
      description: user.infor.description,
      banner: user.infor.banner,
    };
  } else {
    return {
      // _id: null,
      id: null,
      full_name: null,
      level: null,
      email: null,
      image: null,
      description: null,
      banner: null,
    };
  }
};

export default useUserInfo;
