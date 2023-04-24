import { useEffect, useMemo } from 'react';
import { STATUS } from 'types';
import { useOrdersRequest } from 'utils/hooks';

interface IProps {
  sortBy: string,
  ordersOnLoad: string,
}

export const useOrdersListWrapper = ({ sortBy, ordersOnLoad }: IProps) => {
  const {
    orders,
    ordersDate,
    loadOrders,
    isLoading,
  } = useOrdersRequest({ sortBy });

  const isNoORders = useMemo(() => {
    return ordersDate.length === 0 && !isLoading;
  }, [isLoading, location]);

  useEffect(() => {
    if(ordersOnLoad === 'waiting') {
      loadOrders([STATUS.created, STATUS.onWay, STATUS.ready]);
    } 
    if(ordersOnLoad === 'completed') {
      loadOrders([STATUS.delivered]);
    }
  }, [ordersOnLoad, sortBy]);

  return {
    orders,
    isNoORders,
    ordersDate,
    isLoading,
  };
};
