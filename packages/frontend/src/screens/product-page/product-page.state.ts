import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { IDish, IMenu, SORT } from 'types';
import { useReload, useRequest } from 'utils/hooks';
import {
  getDish,
  getMenu,
  getRecommendedDishes,
  getRecommendedMenus,
} from 'utils/api';

interface IProps {
  id: string | undefined,
}

export const useProductPage = ({ id }: IProps) => {
  const { pathname } = useLocation();
  const isMenuOnAdd = pathname.includes('home/add-menu');
  const isOnAdd = pathname.includes('home/add');

  const [ product, setProduct ] = useState<IDish | IMenu | null>(null);
  const [ recommended, setRecommended ] = useState<IDish[] | IMenu[] | []>([]);
  const { isReload, handleReload } = useReload();

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

  let productToAdd: IDish | IMenu = {
    title: '',
    description: '',
    sort: SORT.food,
    categories: [],
    ingredients: [],
    allergens: [],
    id: '',
    weight: 0,
    price: 0,
    image: '',
  };

  if(isMenuOnAdd) {
    productToAdd = {
      ...productToAdd,
      dishesId: [],
    };
  }

  useEffect(() => {
    if(pathname.includes('dishes')) {
      loadDish();
    }

    if(pathname.includes('menus')) {
      loadMenu();
    }

    window.scrollTo(0, 0);
  }, [id, isReload]);

  return {
    recommended,
    product,
    isError,
    isLoading,
    handleReload,
    isOnAdd,
    productToAdd,
    pathname,
  };
};
