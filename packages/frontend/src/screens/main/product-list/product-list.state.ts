import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { loadDishes } from 'store/features/dishes';

export const useProductState = () => {
  const dispatch = useAppDispatch();
  const {
    dishes,
    isLoading,
    isError,
  } = useAppSelector(state => state.dishes);

  useEffect(() => {
    dispatch(loadDishes());
  }, []);

  return { dishes, isLoading, isError };
};
