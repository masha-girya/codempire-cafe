import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IDish, IMenu } from 'types';
import { useRequest } from 'utils/hooks';
import { useAppDispatch, useAppSelector } from 'store';
import { cartActions } from 'store/features';
import {
  getDish,
  getMenu,
  getRecommendedDishes,
  getRecommendedMenus,
} from 'utils/api';

interface IProps {
  id: string | undefined,
  location: string,
}

export const useProductPage = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.cart);

  const { id, location } = props;

  const [ product, setProduct ] = useState<IDish | IMenu | null>(null);
  const [ recommended, setRecommended ] = useState<IDish[] | IMenu[] | []>([]);

  const {
    sendUniqueRequest,
    isError,
    isLoading,
  } = useRequest();

  const handleRemove = useCallback(() => {
    if (product) {
      const index = products.findIndex(item => (
        item.product.id === product.id
      ));

      dispatch(cartActions.removeProduct(products[index]));
    }
  }, [product]);

  const handleAdd = useCallback(() => {
    if(product) {
      dispatch(cartActions.addProduct(product));
    }
  }, [product]);

  const handleClick = () => {
    navigate(-1);
  };

  const isItemInCart = useMemo(() => {
    return products.find(item => item.product.id === id);
  }, [products]);

  const loadDish = useCallback(async() => {
    const requestDish = () => getDish(id || '');
    const requestRecommended = () => getRecommendedDishes(id || '');

    const [dish, recommended] = await Promise.all([
      await sendUniqueRequest(requestDish),
      await sendUniqueRequest(requestRecommended),
    ]);

    setProduct(dish || null);
    setRecommended(recommended || []);
  }, [id]);

  const loadMenu = useCallback(async() => {
    const requestMenu = () => getMenu(id || '');
    const requestRecommended = () => getRecommendedMenus(id || '');

    const [menu, recommended] = await Promise.all([
      await sendUniqueRequest(requestMenu),
      await sendUniqueRequest(requestRecommended),
    ]);

    setProduct(menu || null);
    setRecommended(recommended || []);
  }, [id]);

  useEffect(() => {
    if(location.includes('dish')) {
      loadDish();
    }

    if(location.includes('menu')) {
      loadMenu();
    }

    window.scrollTo(0, 0);
  }, [id]);

  return {
    recommended,
    product,
    isError,
    isLoading,
    isItemInCart,
    handleClick,
    handleRemove,
    handleAdd,
  };
};
