import { useCallback, useState } from 'react';

export const useAuthRequest = () => {
  const [ isError, setIsError ] = useState(false);

  const sendAuthRequest = useCallback(async (callback: () => Promise<void>) => {
    try{
      setIsError(false);
      await callback();
    } catch (error) {
      console.error('error in request', error);
      setIsError(true);
    }
  }, []);

  return { sendAuthRequest, isError, setIsError };
};
