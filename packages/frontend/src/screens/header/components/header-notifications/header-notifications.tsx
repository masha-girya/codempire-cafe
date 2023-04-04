import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import './header-notifications.scss';

export const HeaderNotifications = () => (
  <div className="icons">
    <button className="icons__icon">
      <Icon type="notifications" />
    </button>

    <Link to="cart" className="icons__icon">
      <Icon type="cart" />
    </Link>
  </div>
);
