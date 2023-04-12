import { useCallback, useMemo } from 'react';
import { IDish, IMenu } from 'types';
import { useAppDispatch, useAppSelector } from 'store';
import { cartActions } from 'store/features';
import { getLocalItem } from 'utils/helpers';
import { STORAGE_CONSTANTS as STORAGE } from 'constants-app';

interface IProps {
  product: IDish |IMenu,
}

export const useProductActions = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.cart);
  const { product } = props;

  const isLoggedIn = useMemo(() => {
    const token = getLocalItem(STORAGE.ACCESS_TOKEN);

    if(token) {
      return false;
    }

    return true;
  }, []);

  const handleRemove = useCallback(() => {
    const index = products.findIndex(item => (
      item.product.id === product.id
    ));

    dispatch(cartActions.removeProduct(products[index]));
  }, [product, products]);

  const handleAdd = useCallback(() => {
    dispatch(cartActions.addProduct(product));
  }, [product]);

  const isItemInCart = useMemo(() => {
    return products.find(item => item.product.id === product.id);
  }, [products, product]);

  return {
    isLoggedIn,
    isItemInCart,
    handleRemove,
    handleAdd,
  };
};
