import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const useUserInfo = () => {
  const { user } = useSelector((state) => state.auth);

  const [id, setId] = useState('');
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (user.infor !== undefined) {
      setId(user.infor.id);
      setFullName(user.infor.full_name);
      setEmail(user.infor.email);
      setLevel(user.infor.level);
      setImage(user.infor.image);
      setDescription(user.infor.description);
    }
  }, [user]);

  return { id, full_name, level, email, image, description };
};

export default useUserInfo;
