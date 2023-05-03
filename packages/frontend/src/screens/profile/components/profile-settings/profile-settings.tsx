import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './profile-settings.scss';

export const ProfileSettings = () => {
  return (
    <ul className="profile-settings">
      <li className="profile-settings__title">Settings</li>

      <li>
        <Link to={ROUTE.PRIVACY_POLICY} className="profile-settings__link">
          <p>Privacy policy</p>
          <Icon type="rightArrow" />
        </Link>
      </li>

      <li>
        <Link
          to={ROUTE.PROFILE_CHANGE_PASS}
          className="profile-settings__link"
        >
          <p>Change password</p>
          <Icon type="rightArrow" />
        </Link>
      </li>

      <li>
        <Link
          to={ROUTE.PROFILE_DELETE_ACCOUNT}
          className="profile-settings__link"
        >
          <p>Delete account</p>
          <Icon type="rightArrow" />
        </Link>
      </li>

      <li>
        <Link to={ROUTE.ORDERS_WAITING} className="profile-settings__link">
          <p>Orders</p>
          <Icon type="rightArrow" />
        </Link>
      </li>
    </ul>
  );
};
