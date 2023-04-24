import { useMemo } from 'react';
import { IDish, IMenu } from 'types';
import { useAppDispatch } from 'store';
import { cartActions } from 'store/features/cart.slice';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';

interface IProps {
  product: IDish | IMenu,
  amount: number,
}

export const useCartItem = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { product, amount } = props;

  const handleRemove = () => {
    dispatch(cartActions.removeProduct(props));
  };

  const handleIncrease = () => {
    dispatch(cartActions.increaseAmount(product));
  };

  const handleDecrease = () => {
    if (amount === 1) {
      dispatch(cartActions.removeProduct(props));
    } else {
      dispatch(cartActions.decreaseAmount(product));
    }
  };

  const link = useMemo(() => {
    if('dishesId' in product) {
      return ROUTE.MAIN_PAGE_MENUS;
    }

    return ROUTE.MAIN_PAGE_DISHES;
  }, [product]);

  const numPrice = Number(product.price);

  return {
    link,
    numPrice,
    handleRemove,
    handleIncrease,
    handleDecrease,
  };
};
