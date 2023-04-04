import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './header-user.scss';

export const HeaderUser = () => {
  const { name, surname, role, avatar } = useAppSelector((state) => state.user);

  return (
    <div className="header-user">
      <Link to={ROUTE.PROFILE} className="header-user__menu">

        <div className="header-user__info">
          <p className="header-user__status">{role}</p>
          <p className="header-user__name">
            {name ? `${name} ${surname}` : 'Name Surname'}
          </p>
        </div>

        <div>
          <img
            src={`data:image/png;base64,${avatar}`}
            alt="photo"
            className="header-user__photo"
          />
        </div>
      </Link>
    </div>
  );
};
