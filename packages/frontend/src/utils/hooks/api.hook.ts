import { useCallback, useState } from 'react';
import { ICategories, IDish, IMenu } from 'types';

export const useRequest = () => {
  const [ isError, setIsError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  const sendUniqueRequest = useCallback(async (callback: () => Promise<any>) => {
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

  const sendAuthRequest = useCallback(async (callback: () => Promise<void>) => {
    try{
      setIsError(false);
      await callback();
    } catch (error) {
      console.error('error in request', error);
      setIsError(true);
    }
  }, []);

  const sendCategoryRequest = useCallback(async(
    callback: () => Promise<ICategories>,
  ) => {
    try{
      return await callback();
    } catch (error) {
      console.error('error in request', error);
    }
  }, []);

  const sendProductsRequest = useCallback(async (callback: () => Promise<IDish[] | IMenu[]>) => {
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
    sendProductsRequest,
    sendCategoryRequest,
    sendAuthRequest,
    sendUniqueRequest,
    isError,
    setIsError,
    isLoading,
  };
};
