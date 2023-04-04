import { useCallback, useEffect, useState } from 'react';
import { useRequest } from 'utils/hooks';
import { getCategories } from 'utils/api';

interface IState {
  food: string[],
  drinks: string[],
}

export const useSidebar = () => {
  const { sendCategoryRequest } = useRequest();

  const [ category, setCategory ] = useState<IState>({
    drinks: [],
    food: [],
  });

  const loadData = useCallback(async() => {
    const categories = await sendCategoryRequest(() => getCategories());

    setCategory(prevState => ({
      ...prevState,
      food: categories?.food || [],
      drinks: categories?.drinks || [],
    }));
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return { category };
};
