import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { useAppSelector } from 'store';
import { ROLE } from 'types';
import './header-notifications.scss';

export const HeaderNotifications = () => {
  const { role } = useAppSelector(state => state.user);

  return (
  <div className="icons">
    <button className="icons__icon">
      <Icon type="notifications" />
    </button>

    {role === ROLE.user && (
      <Link to="cart" className="icons__icon">
        <Icon type="cart" />
      </Link>
    )}
  </div>
  );
};
