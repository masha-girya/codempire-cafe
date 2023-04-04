import { useCallback, useMemo } from 'react';
import { IDish, IMenu } from 'types';
import { useAppDispatch, useAppSelector } from 'store';
import { cartActions } from 'store/features';

interface IProps {
  product: IDish |IMenu,
}

export const useProductActions = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.cart);
  const { product } = props;

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
    isItemInCart,
    handleRemove,
    handleAdd,
  };
};
