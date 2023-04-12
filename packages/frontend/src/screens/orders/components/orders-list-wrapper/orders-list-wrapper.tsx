import React from 'react';
import { OrdersList } from '../../components';
import { useOrdersListWrapper } from './orders-list-wrapper.state';

interface IProps {
  sortBy: string,
}

export const OrdersListWrapper = ({ sortBy }: IProps) => {
  const {
    orders,
    ordersDate,
    isLoading,
  } = useOrdersListWrapper({ sortBy });

  return (
    <>
      {isLoading
        ? <p>Loading...</p>
        : ordersDate.map(date => (
          <OrdersList
            orderDate={date}
            orders={orders}
            key={date.toString()}
          />
        ))
      }
    </>
  );
};
