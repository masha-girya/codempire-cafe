import { useEffect } from 'react';
import { useAppSelector } from 'store';
import { ROLE, STATUS } from 'types';
import { useOrdersRequest } from 'utils/hooks';

export const useNotificationsManager = () => {
  const { role } = useAppSelector(state => state.user);
  const {
    orders,
    ordersDate,
    loadOrders,
    isLoading,
  } = useOrdersRequest({ sortBy: 'newest' });

  useEffect(() => {
    if(role === ROLE.user) {
      loadOrders([STATUS.ready]);
    }

    if(role === ROLE.manager) {
      loadOrders([STATUS.created]);
    }
  }, []);

  return { orders, ordersDate, isLoading };
};
