import { useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import { IDish, IMenu } from 'types';

interface IProps {
  id: string,
  card: IMenu | IDish,
}

export const useProductCard = (props: IProps) => {
  const { role } = useAppSelector((state) => state.user);
  const { card } = props;

  const link = 'dishesId' in card ? ROUTE.MAIN_PAGE_MENUS : ROUTE.MAIN_PAGE_DISHES;

  return { link, role };
};
