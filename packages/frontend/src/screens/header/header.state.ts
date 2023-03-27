import { useEffect, useState, useCallback } from 'react';
import { useRequest } from 'utils/hooks';
import { useUser } from 'utils/hooks';

export const useHeader = () => {
  const [ isUser, setIsUser ] = useState(true);
  const { sendUniqueRequest } = useRequest();
  const { checkUser } = useUser();

  const loadUser = useCallback(async() => {
    const user = await sendUniqueRequest(checkUser);

    if(!user) {
      setIsUser(false);
      return;
    }
  }, [isUser]);

  useEffect(() => {
    loadUser();
  }, [isUser]);

  return { isUser };
};
