import React from 'react';
import { Loader } from 'components/loader';
import { OrdersList } from 'screens/orders/components';
import { useNotificationsManager } from './notifications-manager.state';

export const NotificationsManager = () => {
  const { orders, ordersDate, isLoading } = useNotificationsManager();

  return (
    <>
      {isLoading
        ? <Loader isDark={true} />
        : (
          ordersDate.map(date => (
            <OrdersList
              key={date.toString()}
              orderDate={date}
              orders={orders}
              isNotifications={true}
            />))
        )
      }

      {!isLoading && ordersDate.length === 0 && <h4>No notifications yet</h4>}
    </>
  );
};

