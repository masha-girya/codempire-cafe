import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { useAppSelector } from 'store';
import { ROLE } from 'types';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import { useNotifications } from './header-notifications.state';
import './header-notifications.scss';

export const HeaderNotifications = () => {
  const { role } = useAppSelector(state => state.user);
  const { products } = useAppSelector(state => state.cart);
  const { orders } = useNotifications();

  return (
  <div className="icons">
    <Link to={ROUTE.NOTIFICATIONS} className="icons__icon">
      <Icon type="notifications" />
        {orders.length > 0 && (
          <p className="icons__amount">{orders.length}</p>
        )}
    </Link>

    {role === ROLE.user && (
      <Link to={ROUTE.CART} className="icons__icon">
        <Icon type="cart" />
          {products.length > 0 && (
            <p className="icons__amount">{products.length}</p>
          )}
      </Link>
    )}
  </div>
  );
};
