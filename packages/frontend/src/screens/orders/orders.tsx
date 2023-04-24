import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from 'screens/header';
import { BottomBar } from 'components/bottom-bar';
import { OrdersListWrapper, TopSwitcher } from './components';
import { useOrders } from '../orders';
import {
  ROUTE_CONSTANTS as ROUTE,
} from 'constants-app';
import './orders.scss';

export const Orders = () => {
  const {
    isUser,
    sortBy,
    locationWaiting,
    locationCompleted,
    handleSortChange,
  } = useOrders();

  return (
    <>
      {isUser ? (
        <div>
          <Outlet />
          <Header />

          <div className="orders">
            <TopSwitcher
              sortBy={sortBy}
              handleSortChange={handleSortChange}
            />

            <div className="orders__list">
              {locationWaiting && <OrdersListWrapper sortBy={sortBy} ordersOnLoad="waiting" />}
              {locationCompleted && <OrdersListWrapper sortBy={sortBy} ordersOnLoad="completed" />}
            </div>
          </div>

          <BottomBar />
        </div>
      ) : (
        <Navigate to={ROUTE.HOME} replace />
      )}
    </>
  );
};
