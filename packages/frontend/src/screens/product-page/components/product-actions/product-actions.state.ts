import { useCallback, useMemo } from 'react';
import { IDish, IMenu, ROLE } from 'types';
import { useAppDispatch, useAppSelector } from 'store';
import { cartActions } from 'store/features';
import { getLocalItem } from 'utils/helpers';
import { useReload } from 'utils/hooks';
import { STORAGE_CONSTANTS as STORAGE } from 'constants-app';

interface IProps {
  product: IDish |IMenu,
}

export const useProductActions = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { isReload, handleReload } = useReload();
  const { products } = useAppSelector(state => state.cart);
  const { role } = useAppSelector(state => state.user);
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

  const itemInCart = useMemo(() => {
    return products.find(item => item.product.id === product.id);
  }, [products, product]);

  const isManager = useMemo(() => {
    return role === ROLE.manager;
  }, [role]);

  return {
    isReload,
    handleReload,
    isManager,
    isLoggedIn,
    itemInCart,
    handleRemove,
    handleAdd,
  };
};
