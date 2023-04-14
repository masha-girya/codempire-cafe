import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  ROUTE_CONSTANTS as ROUTE,
  STORAGE_CONSTANTS as STORAGE,
} from 'constants-app';
import { cartActions } from 'store/features';
import { IDish, IMenu } from 'types';
import { getLocalItem } from 'utils/helpers';

interface IProps {
  id: string,
  card: IMenu | IDish,
}

export const useProductCard = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);
  const { role } = useAppSelector((state) => state.user);
  const { id, card } = props;

  const link = 'dishesId' in card ? ROUTE.MAIN_PAGE_MENU : ROUTE.MAIN_PAGE_DISH;

  const isLoggedIn = useMemo(() => {
    const token = getLocalItem(STORAGE.ACCESS_TOKEN);

    if(token) {
      return false;
    }

    return true;
  }, []);

  const handleAdd = useCallback(() => {
    dispatch(cartActions.addProduct(card));
  }, []);

  const handleRemove = useCallback(() => {
    const index = products.findIndex((item) => item.product.id === card.id);

    dispatch(cartActions.removeProduct(products[index]));
  }, [products]);

  const isItemInCart = useMemo(() => {
    return products.find((item) => item.product.id === id);
  }, [products]);

  return {
    link,
    role,
    isLoggedIn,
    isItemInCart,
    handleAdd,
    handleRemove,
  };
};
