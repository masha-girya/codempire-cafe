import { IOrder, ROLE } from 'types';
import { useAppSelector } from 'store';
import { cutText } from 'utils/helpers';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';

interface IProps {
  order: IOrder,
  isNotifications?: boolean,
}

export const useOrdersField = (props: IProps) => {
  const { role } = useAppSelector(state => state.user);

  const { order, isNotifications } = props;
  const { number, dishId, menuId, watchedManager, watchedUser } = order;

  const orderItems = [...dishId, ...menuId].join(', ');
  const orderItemsText = cutText(orderItems);

  const link = isNotifications ? `${ROUTE.ORDERS_WAITING}/${number}` : `${number}`;
  let isFreshNotification;

  if(role === ROLE.user) {
    isFreshNotification = watchedUser === 'unwatched' && isNotifications;
  }

  if(role === ROLE.manager) {
    isFreshNotification = watchedManager === 'unwatched' && isNotifications;
  }


  const notificationText = role === ROLE.user
    ? 'Your order is on the way'
    : 'You have a new order';

  return { orderItemsText, link, notificationText, isFreshNotification };
};
