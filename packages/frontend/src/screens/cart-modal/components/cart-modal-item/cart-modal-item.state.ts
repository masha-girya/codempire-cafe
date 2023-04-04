import { IDish, IMenu } from 'types';
import { useAppDispatch } from 'store';
import { cartActions } from 'store/features/cart.slice';

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

  const numPrice = Number(product.price);

  return {
    numPrice,
    handleRemove,
    handleIncrease,
    handleDecrease,
  };
};
