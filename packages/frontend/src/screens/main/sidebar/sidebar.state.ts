import { useCallback, useEffect, useState } from 'react';
import { SORT } from 'utils/types';
import { useCategoryRequest, getCategories } from '../sidebar';

export const useSidebar = () => {
  const { sendRequest } = useCategoryRequest();

  const [ drinkCategories, setDrinkCategories ] = useState<string[]>([]);
  const [ foodCategories, setFoodCategories ] = useState<string[]>([]);

  const loadFood = useCallback(async() => {
    const request = () => getCategories(SORT.food);
    const foodCategories = await sendRequest(request);

    setFoodCategories(foodCategories || []);
  }, []);

  const loadDrink = useCallback(async() => {
    const request = () => getCategories(SORT.drink);
    const drinkCategories = await sendRequest(request);

    setDrinkCategories(drinkCategories || []);
  }, []);

  useEffect(() => {
    loadFood();
    loadDrink();
  }, []);

  return { drinkCategories, foodCategories };
};
