import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'utils/hooks';
import { useUser } from 'utils/hooks';

export const useProfile = () => {
  const navigate = useNavigate();
  const [ isUser, setIsUser ] = useState(true);
  const { sendUniqueRequest } = useRequest();
  const { checkUser, removeUser } = useUser();

  const loadUser = useCallback(async() => {
    const user = await sendUniqueRequest(checkUser);

    if(!user) {
      setIsUser(false);
    }
  }, [isUser]);

  useEffect(() => {
    loadUser();
  }, [isUser]);

  return {
    isUser,
    navigate,
    removeUser,
    sendUniqueRequest,
  };
};
