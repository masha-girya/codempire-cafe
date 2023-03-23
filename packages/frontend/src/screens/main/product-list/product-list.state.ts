import {
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { FilterContext } from '../../main';
import {
  useProductRequest,
  getDishes,
  getMenus,
} from '../product-list';
import { IDish, IMenu } from 'utils/types';

interface IProps {
  productOnLoad: string,
}

export const useProductState = (props: IProps) => {
  const { productOnLoad } = props;
  const [ products, setProducts ] = useState<IMenu[] | IDish[]>([]);
  const { filter, sortBy, setSortBy, setFilter } = useContext(FilterContext);

  const {
    sendRequest,
    isError,
    isLoading,
  } = useProductRequest();

  const loadDishes = useCallback(async() => {
    const request = () => getDishes(filter, sortBy);
    const dishes = await sendRequest(request);

    setProducts(dishes || []);
  }, [filter, sortBy]);

  const loadMenus = useCallback(async() => {
    const request = () => getMenus(filter, sortBy);
    const menus = await sendRequest(request);

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
