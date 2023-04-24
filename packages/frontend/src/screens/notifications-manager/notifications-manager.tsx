import React from 'react';
import { OrdersList } from 'screens/orders/components';
import { useNotificationsManager } from './notifications-manager.state';

export const NotificationsManager = () => {
  const { orders, ordersDate, isLoading } = useNotificationsManager();

  return (
    <>
      {isLoading
        ? <p>Loading...</p>
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
    </>
  );
};

