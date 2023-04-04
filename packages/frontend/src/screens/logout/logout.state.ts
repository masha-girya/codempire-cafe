import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from 'utils/api';
import { useRequest } from 'utils/hooks';

export const useLogout = () => {
  const navigate = useNavigate();
  const [ isUser, setIsUser ] = useState(false);
  const { sendUniqueRequest } = useRequest();

  const checkUser = useCallback(async() => {
    const user = await sendUniqueRequest(validateToken);

    if(user) {
      setIsUser(true);
    }
  }, [isUser]);

  useEffect(() => {
    checkUser();
  }, []);

  return { isUser, navigate };
};
