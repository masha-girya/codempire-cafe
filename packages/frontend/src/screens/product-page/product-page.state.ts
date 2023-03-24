import { useCallback, useEffect, useState } from 'react';
import { IDish, IMenu } from 'utils/types';
import {
  getDish,
  getMenu,
  getRecommendedDishes,
  getRecommendedMenus,
  useProductPageRequest,
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
    sendRequest,
    isError,
    isLoading,
  } = useProductPageRequest();

  const loadDish = useCallback(async() => {
    const requestDish = () => getDish(id || '');
    const requestRecommended = () => getRecommendedDishes(id || '');

    const [dish, recommended] = await Promise.all([
      await sendRequest(requestDish),
      await sendRequest(requestRecommended),
    ]);

    setProduct(dish || null);
    setRecommended(recommended || []);
  }, [id]);

  const loadMenu = useCallback(async() => {
    const requestMenu = () => getMenu(id || '');
    const requestRecommended = () => getRecommendedMenus(id || '');

    const [menu, recommended] = await Promise.all([
      await sendRequest(requestMenu),
      await sendRequest(requestRecommended),
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
