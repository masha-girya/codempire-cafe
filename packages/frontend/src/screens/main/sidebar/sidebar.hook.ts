import { useCallback } from 'react';

export const useCategoryRequest = () => {
  const sendRequest = useCallback(async (callback: () => Promise<string[]>) => {
    try{
      return await callback();
    } catch (error) {
      console.error('error in request', error);
    }
  }, []);

  return { sendRequest };
};