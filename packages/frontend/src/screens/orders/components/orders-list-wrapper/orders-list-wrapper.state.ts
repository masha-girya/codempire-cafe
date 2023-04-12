import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useRequest } from 'utils/hooks';
import { getOrders } from 'utils/api';
import { IOrder, STATUS } from 'types';
import dayjs from 'dayjs';

interface IProps {
  sortBy: string,
}

export const useOrdersListWrapper = ({ sortBy }: IProps) => {
  const location = useLocation();
  const { sendUniqueRequest, isLoading } = useRequest();

  const [ orders, setOrders ] = useState<IOrder[]>([]);
  const [ ordersDate, setOrdersDate ] = useState<string[]>([]);

  const locationWaiting = location.pathname.includes('waiting');
  const locationCompleted = location.pathname.includes('completed');

  const loadOrders = useCallback(async(status: string []) => {
    const orders = await sendUniqueRequest(() => (
      getOrders(status, sortBy)
    ));

    if(orders) {
      const dates = orders.map((order: IOrder) => dayjs(order.date).format('DD/MM/YYYY'));
      const uniqueDates: Set<string> = new Set(dates);
      const datesFromSet = Array.from(uniqueDates);

      setOrdersDate(datesFromSet);
      setOrders(orders);
    }
  }, [sortBy]);

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
    ordersDate,
    isLoading,
    locationWaiting,
    locationCompleted,
  };
};
