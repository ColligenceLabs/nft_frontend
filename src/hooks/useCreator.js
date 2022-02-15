import { getCreatorData } from '../services/creator.service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useCreator = () => {
  const [creatorList, setCreatorList] = useState();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCreator = async () => {
      await getCreatorData()
        .then(({ data: { items } }) => {
          let creatorArray = [];
          if (user.infor.level.toLowerCase() === 'creator') {
            creatorArray = items.filter(
              (item) => item._id === user.infor.id && { _id: item._id, full_name: item.full_name },
            );
          } else {
            creatorArray = items.map((item) => ({
              _id: item._id,
              full_name: item.full_name,
            }));
          }
          setCreatorList(creatorArray);
        })
        .catch((error) => console.log(error));
    };
    fetchCreator();
  }, [getCreatorData]);

  return creatorList;
};

export default useCreator;
