import { getCreatorData } from '../services/creator.service';
import { useEffect, useState } from 'react';
import useUserInfo from './useUserInfo';

const useCreator = () => {
  const [creatorList, setCreatorList] = useState();
  const { level, id } = useUserInfo();
  useEffect(() => {
    const fetchCreator = async () => {
      await getCreatorData()
        .then(({ data: { items } }) => {
          let creatorArray = [];
          if (level.toLowerCase() === 'creator') {
            creatorArray = items.filter(
              (item) => item._id === id && { _id: item._id, full_name: item.full_name },
            );
          } else {
            creatorArray = items
              .filter((item) => item.status === 'active')
              .map((item) => ({
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
