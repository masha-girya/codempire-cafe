import {
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import {
  useProductRequest,
  getDishes,
  getMenus,
} from '../product-list';
import { IDish, IMenu } from 'utils/types';
import { FilterContext } from '../../main';

interface IProps {
  productOnLoad: string,
}

export const useProductState = (props: IProps) => {
  const { productOnLoad } = props;
  const [ products, setProducts ] = useState<IMenu[] | IDish[]>([]);
  const { filter } = useContext(FilterContext);

  const {
    sendRequest,
    isError,
    isLoading,
  } = useProductRequest();

  const loadDishesByFilter = useCallback(async() => {
    const request = () => getDishes(filter);
    const dishes = await sendRequest(request);

    setProducts(dishes || []);
  }, [filter]);

  const loadMenusByFilter = useCallback(async() => {
    const request = () => getMenus(filter);
    const menus = await sendRequest(request);

    setProducts(menus || []);
  }, [filter]);

  useEffect(() => {
    if(productOnLoad === 'dishes') {
      loadDishesByFilter();
    }

    if(productOnLoad === 'menus') {
      loadMenusByFilter();
    }
  }, [productOnLoad, filter]);

  return { products, isLoading, isError };
};
