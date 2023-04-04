import {
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { FilterContext } from '../../../main';
import { useRequest } from 'utils/hooks';
import { getDishes, getMenus } from 'utils/api';
import { IDish, IMenu } from 'types';

interface IProps {
  productOnLoad: string,
}

export const useProductState = (props: IProps) => {
  const { productOnLoad } = props;
  const [ products, setProducts ] = useState<IMenu[] | IDish[]>([]);
  const { filter, sortBy, setSortBy, setFilter } = useContext(FilterContext);

  const {
    sendProductsRequest,
    isError,
    isLoading,
  } = useRequest();

  const loadDishes = useCallback(async() => {
    const request = () => getDishes(filter, sortBy);
    const dishes = await sendProductsRequest(request);

    setProducts(dishes || []);
  }, [filter, sortBy]);

  const loadMenus = useCallback(async() => {
    const request = () => getMenus(filter, sortBy);
    const menus = await sendProductsRequest(request);

    setProducts(menus || []);
  }, [filter, sortBy]);

  useEffect(() => {
    if(productOnLoad === 'dishes') {
      loadDishes();
    }

    if(productOnLoad === 'menus') {
      loadMenus();
    }
  }, [productOnLoad, filter, sortBy]);

  useEffect(() => {
    setFilter([]);
    setSortBy('');
  }, [productOnLoad]);

  return { products, isLoading, isError };
};
