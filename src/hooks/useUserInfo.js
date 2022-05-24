import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useWeb3React } from '@web3-react/core';
import { loginWithAddress } from '../redux/slices/auth';

const useUserInfo = () => {
  const { account, chainId } = useWeb3React();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (user.user) setUser(user.user);
  }, [user]);

  useEffect(() => {
    if (account) {
      dispatch(loginWithAddress({ address: account, chainId }));
      console.log(account);
    }
  }, [account]);

  if (user.infor) {
    return {
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
