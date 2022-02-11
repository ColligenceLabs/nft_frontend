import { getCreatorData } from '../services/creator.service';
import { useEffect, useState } from 'react';

const useCreator = () => {
  const [creatorList, setCreatorList] = useState();

  useEffect(() => {
    const fetchCreator = async () => {
      await getCreatorData()
        .then(({ data: { items } }) => {
          let creatorArray = items.map((item) => ({
            _id: item._id,
            full_name: item.full_name,
          }));
          setCreatorList(creatorArray);
        })
        .catch((error) => console.log(error));
    };
    fetchCreator();
  }, [getCreatorData]);

  return creatorList;
};

export default useCreator;
