import { useCallback, useEffect, useState } from 'react';
import { getCategories } from 'utils/api';
import { useRequest } from 'utils/hooks';

export const useConnecting = () => {
  const [ showModal, setShowModal ] = useState(true);
  const firstConnection = sessionStorage.getItem('connected');
  const { sendUniqueRequest } = useRequest();

  const connectToDB = useCallback(async() => {
    setShowModal(true);

    const response = await sendUniqueRequest(getCategories);

    if(response) {
      sessionStorage.setItem('connected', 'true');
      setShowModal(false);
    }
  } , []);

  useEffect(() => {
    if(!firstConnection) {
      connectToDB();
    }

    return () => {
      sessionStorage.clear();
    };
  }, []);

  return { showModal };
};
