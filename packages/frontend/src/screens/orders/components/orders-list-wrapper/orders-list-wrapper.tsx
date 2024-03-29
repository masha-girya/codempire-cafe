import React from 'react';
import { Loader } from 'components/loader';
import { OrdersList } from '../../components';
import { useOrdersListWrapper } from './orders-list-wrapper.state';

interface IProps {
  sortBy: string,
  ordersOnLoad: string,
}

export const OrdersListWrapper = ({ sortBy, ordersOnLoad }: IProps) => {
  const {
    orders,
    isNoORders,
    ordersDate,
    isLoading,
  } = useOrdersListWrapper({ sortBy, ordersOnLoad });

  return (
    <>
      {isLoading
        ? <Loader isDark={true} />
        : ordersDate.map(date => (
          <OrdersList
            orderDate={date}
            orders={orders}
            key={date.toString()}
          />
        ))
      }

      {isNoORders && <h3>No orders yet...</h3>}
    </>
  );
};
