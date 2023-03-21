import { useCallback, useState } from 'react';
import { IMenu, IDish } from 'utils/types';

export const useProductRequest = () => {
  const [ isError, setIsError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  const sendRequest = useCallback(async (callback: () => Promise<IDish[] | IMenu[]>) => {
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

  return { sendRequest, isError, setIsError, isLoading };
};