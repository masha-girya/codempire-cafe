import { useState, useCallback, useEffect, useMemo } from 'react';
import { IMenu, IDish } from 'types';
import { STORAGE_CONSTANTS as STORAGE } from 'constants-app';
import { useAppDispatch, useAppSelector } from 'store';
import { cartActions } from 'store/features';
import { getLocalItem } from 'utils/helpers';

interface IProps {
  card: IMenu | IDish,
  id: string,
}

export const useUserActions = ({ card, id }: IProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);

  const [ isOnAction, setIsOnAction ] = useState(false);

  const handleAdd = useCallback(() => {
    setIsOnAction(true);
    dispatch(cartActions.addProduct(card));
  }, []);

  const handleRemove = useCallback(() => {
    setIsOnAction(true);
    const index = products.findIndex((item) => item.product.id === card.id);

    dispatch(cartActions.removeProduct(products[index]));
  }, [products]);

  const isLoggedIn = useMemo(() => {
    const token = getLocalItem(STORAGE.ACCESS_TOKEN);

    if(token) {
      return false;
    }

    return true;
  }, []);

  const isItemInCart = useMemo(() => {
    return products.find((item) => item.product.id === id);
  }, [products]);

  useEffect(() => {
    setTimeout(() => setIsOnAction(false), 1000);
  }, [isOnAction]);

  return {
    handleRemove,
    handleAdd,
    isLoggedIn,
    isItemInCart,
    isOnAction,
  };
};
