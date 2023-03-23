import { useCallback, useState } from 'react';

export const useProductPageRequest = () => {
  const [ isError, setIsError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  const sendRequest = useCallback(async (callback: () => Promise<any>) => {
    try{
      setIsError(false);
      return await callback();
    } catch (error) {
      console.error('error in request', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendRequest,
    isError,
    setIsError,
    isLoading,
  };
};
