import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { STATUS } from 'types';
import { useOrdersRequest } from 'utils/hooks';
import { PATHNAME_CONSTANTS as PATHNAME } from 'constants-app';

interface IProps {
  sortBy: string,
}

export const useOrdersListWrapper = ({ sortBy }: IProps) => {
  const location = useLocation();
  const {
    orders,
    ordersDate,
    loadOrders,
    isLoading,
  } = useOrdersRequest({ sortBy });

  const locationWaiting = location.pathname.includes(PATHNAME.ORDER_WAITING);
  const locationCompleted = location.pathname.includes(PATHNAME.ORDER_COMPLETED);

  const isNoORders = useMemo(() => {
    return ordersDate.length === 0 && !isLoading;
  }, [isLoading, location]);

  useEffect(() => {
    if(locationWaiting) {
      loadOrders([STATUS.created, STATUS.onWay, STATUS.ready]);
    } 
    if(locationCompleted) {
      loadOrders([STATUS.delivered]);
    }
  }, [location, sortBy]);

  return {
    orders,
    isNoORders,
    ordersDate,
    isLoading,
  };
};
