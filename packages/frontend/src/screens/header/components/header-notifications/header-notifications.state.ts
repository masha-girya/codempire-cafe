import { useEffect } from 'react';
import { useOrdersRequest } from 'utils/hooks';
import { useAppSelector } from 'store';
import { ROLE, STATUS, TWatchStatus } from 'types';

export const useNotifications = () => {
  const { role } = useAppSelector(state => state.user);
  const { loadOrdersNotifications, orders } = useOrdersRequest({ sortBy: 'newest' });
  const query = { role, status: 'unwatched' as TWatchStatus};

  const loadOrders = async() => {
    if(role === ROLE.user) {
      return await loadOrdersNotifications(STATUS.ready, query);
    }

    if(role === ROLE.manager) {
      return await loadOrdersNotifications(STATUS.created, query);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [role]);

  return { orders };
};
