import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import { cartActions } from 'store/features';
import { IDish, IMenu } from 'types';

interface IProps {
  id: string;
  card: IMenu | IDish;
}

export const useProductCard = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);
  const { id, card } = props;

  const link = 'dishesId' in card ? ROUTE.MAIN_PAGE_MENU : ROUTE.MAIN_PAGE_DISH;

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
    isItemInCart,
    handleAdd,
    handleRemove,
  };
};
