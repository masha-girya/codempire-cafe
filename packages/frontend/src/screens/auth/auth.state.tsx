import { useState, useEffect, useCallback } from 'react';
import { useRequest } from 'utils/hooks';
import { validateToken } from '../auth';

export const useAuth = () => {
  const { sendUniqueRequest } = useRequest();

  const [ isUser, setIsUser ] = useState(false);

  const checkUser = useCallback(async() => {
    const user = await sendUniqueRequest(validateToken);

    if(user) {
      setIsUser(true);
    }
  }, []);

  useEffect(() => {
    checkUser();

    if(isUser && !location.hash.includes('registration')) {
      setIsUser(false);
    }
  }, [isUser]);

  return { isUser };
};
