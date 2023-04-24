import { useEffect } from 'react';
import { useOrdersRequest } from 'utils/hooks';
import { useAppSelector } from 'store';
import { ROLE, STATUS, TWatchStatus } from 'types';

export const useNotifications = () => {
  const { role } = useAppSelector(state => state.user);
  const { loadOrdersNotifications, orders } = useOrdersRequest({ sortBy: 'newest' });
  const query = { role, status: 'unwatched' as TWatchStatus};

  useEffect(() => {
    if(role === ROLE.user) {
      loadOrdersNotifications(STATUS.ready, query);
    }

    if(role === ROLE.manager) {
      loadOrdersNotifications(STATUS.created, query);
    }
  }, [role]);

  return { orders };
};
