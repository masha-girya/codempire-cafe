import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { useRequest } from 'utils/hooks';
import { changeOrder, getOrderByNumber, getOrders } from 'utils/api';
import { IOrder, IOrderInfo, IWatched, STATUS } from 'types';
import { TIME_CONSTANTS as TIME } from 'constants-app';

interface IProps {
  sortBy?: string,
}

export const useOrdersRequest = (props: IProps) => {
  const { sortBy } = props;
  const { sendUniqueRequest, isLoading, isError } = useRequest();

  const [ orders, setOrders ] = useState<IOrder[]>([]);
  const [ order, setOrder ] = useState<IOrderInfo | null>(null);
  const [ ordersDate, setOrdersDate ] = useState<string[]>([]);

  const loadOrders = useCallback(async(status: string[]) => {
    const orders = await sendUniqueRequest(() => (
      getOrders(status, sortBy as string)
    ));

    if(orders) {
      const dates = orders.map((order: IOrder) => dayjs(order.date).format(TIME.DATE));
      const uniqueDates: Set<string> = new Set(dates);
      const datesFromSet = Array.from(uniqueDates);

      setOrdersDate(datesFromSet);
      setOrders(orders);
    }
  }, [sortBy]);

  const loadOrdersNotifications = useCallback(async(status: STATUS, watched: IWatched) => {
    const response: IOrder[] = await sendUniqueRequest(() => (
      getOrders([status], 'newest', watched)
    ));

    if(response) {
      setOrders(response);
    }
  }, []);

  const updateOrder = useCallback(async(number = '', data: Partial<IOrder>) => {
    const order = await sendUniqueRequest(() => changeOrder(number, data));

    return order;
  }, []);

  const loadOrder = useCallback(async(number = '') => {
    const response: IOrderInfo = await sendUniqueRequest(() => (
      getOrderByNumber(number)
    ));

    if(response) {
      setOrder(response);
    }
  }, []);

  return {
    orders,
    order,
    ordersDate,
    loadOrders,
    loadOrder,
    updateOrder,
    isLoading,
    isError,
    loadOrdersNotifications,
  };
};
