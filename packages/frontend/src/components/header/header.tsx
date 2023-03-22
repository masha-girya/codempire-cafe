import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import './header.scss';

export const Header = () => {
  const { name } = useAppSelector(state => state.user);

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__container-menus">
          <div className="header__left-menu">
            <div className="header__logo">
              <Link to={ROUTE.MAIN_PAGE_DISH}>
                <Icon type="logoWhite" />
              </Link>
            </div>

            <div className="header__icons">
              <button className="header__icon">
                <Icon type="notifications" />
              </button>

              <button className="header__icon">
                <Icon type="cart" />
              </button>
            </div>

            <form className="header__form">
              <input
                className="header__search"
                type="search"
                placeholder="Search"
              />
              <button className="header__search-button">
                <Icon type="search" />
              </button>
            </form>
          </div>
          
          <div className="header__right-menu">
            <div className="header__user-info">
              <div className="header__user-info--text">
                <p className="header__user-status">User</p>
                <p className="header__user-name">
                  {name ? name : 'Name Surname'}
                </p>
              </div>

              <div className="header__user-info--photo">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
