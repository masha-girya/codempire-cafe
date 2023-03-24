import { useCallback, useEffect, useState } from 'react';
import { IDish, IMenu } from 'utils/types';
import { useRequest } from 'utils/hooks';
import {
  getDish,
  getMenu,
  getRecommendedDishes,
  getRecommendedMenus,
} from '../product-page';

interface IProps {
  id: string | undefined,
  location: string,
}

export const useProductPage = (props: IProps) => {
  const { id, location } = props;
  const [ product, setProduct ] = useState<IDish | IMenu | null>(null);
  const [ recommended, setRecommended ] = useState<IDish[] | IMenu[] | []>([]);
  const {
    sendUniqueRequest,
    isError,
    isLoading,
  } = useRequest();

  const loadDish = useCallback(async() => {
    const requestDish = () => getDish(id || '');
    const requestRecommended = () => getRecommendedDishes(id || '');

    const [dish, recommended] = await Promise.all([
      await sendUniqueRequest(requestDish),
      await sendUniqueRequest(requestRecommended),
    ]);

    setProduct(dish || null);
    setRecommended(recommended || []);
  }, [id]);

  const loadMenu = useCallback(async() => {
    const requestMenu = () => getMenu(id || '');
    const requestRecommended = () => getRecommendedMenus(id || '');

    const [menu, recommended] = await Promise.all([
      await sendUniqueRequest(requestMenu),
      await sendUniqueRequest(requestRecommended),
    ]);

    setProduct(menu || null);
    setRecommended(recommended || []);
  }, [id]);

  useEffect(() => {
    if(location.includes('dish')) {
      loadDish();
    }

    if(location.includes('menu')) {
      loadMenu();
    }

    window.scrollTo(0, 0);
  }, [id]);

  return {
    recommended,
    product,
    isError,
    isLoading,
  };
};
