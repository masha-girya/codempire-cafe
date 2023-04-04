import { useCallback, useEffect, useState } from 'react';
import { SORT } from 'types';
import { useRequest } from 'utils/hooks';
import { getCategories } from 'utils/api';

export const useSidebar = () => {
  const { sendCategoryRequest } = useRequest();

  const [ drinkCategories, setDrinkCategories ] = useState<string[]>([]);
  const [ foodCategories, setFoodCategories ] = useState<string[]>([]);

  const loadFood = useCallback(async() => {
    const request = () => getCategories(SORT.food);
    const foodCategories = await sendCategoryRequest(request);

    setFoodCategories(foodCategories || []);
  }, []);

  const loadDrink = useCallback(async() => {
    const request = () => getCategories(SORT.drink);
    const drinkCategories = await sendCategoryRequest(request);

    setDrinkCategories(drinkCategories || []);
  }, []);

  useEffect(() => {
    loadFood();
    loadDrink();
  }, []);

  return { drinkCategories, foodCategories };
};
