import { useCallback, useEffect, useState } from 'react';
import { IDish, IMenu } from 'utils/types';
import {
  getDish,
  getMenu,
  useProductPageRequest,
} from '../product-page';

interface IProps {
  id: string | undefined,
  location: string,
}

export const useProductPage = (props: IProps) => {
  const { id, location } = props;
  const [ product, setProduct ] = useState<IDish | IMenu | null>(null);
  const {
    sendRequest,
    isError,
    isLoading,
  } = useProductPageRequest();

  const loadDish = useCallback(async() => {
    const request = () => getDish(id || '');
    const dish = await sendRequest(request);

    setProduct(dish || null);
  }, [id]);

  const loadMenu = useCallback(async() => {
    const request = () => getMenu(id || '');
    const menu = await sendRequest(request);

    setProduct(menu || null);
  }, [id]);

  useEffect(() => {
    if(location.includes('dish')) {
      loadDish();
    }

    if(location.includes('menu')) {
      loadMenu();
    }
  }, []);

  return {
    product,
    isError,
    isLoading,
  };
};
