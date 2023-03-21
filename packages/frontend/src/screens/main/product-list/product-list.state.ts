import { useEffect, useState, useCallback } from 'react';
import { useProductRequest, getDishes, getMenus } from '../product-list';
import { IDish, IMenu } from 'utils/types';

interface IProps {
  productOnLoad: string,
}

export const useProductState = (props: IProps) => {
  const { productOnLoad } = props;
  const [ products, setProducts ] = useState<IMenu[] | IDish[]>([]);
  const {
    sendRequest,
    isError,
    isLoading,
  } = useProductRequest();

  const loadDishes = useCallback(async() => {
    const dishes = await sendRequest(getDishes);
    setProducts(dishes || []);
    return dishes;
  }, []);

  const loadMenus = useCallback(async() => {
    const menus = await sendRequest(getMenus);
    setProducts(menus || []);
    return menus;
  }, []);

  useEffect(() => {
    if(productOnLoad === 'dishes') {
      loadDishes();
    }

    if(productOnLoad === 'menus') {
      loadMenus();
    }
  }, [productOnLoad]);

  return { products, isLoading, isError };
};
