import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { MainButton } from 'components/button';
import { Search } from 'screens/search';
import { useHeader } from '../header';
import { useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import './header.scss';

export const Header = () => {
  const { isUser } = useHeader();
  const {
    name,
    role,
    avatar,
  } = useAppSelector(state => state.user);

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

            {isUser && (
              <div className="header__icons">
                <button className="header__icon">
                  <Icon type="notifications" />
                </button>

                <button className="header__icon">
                  <Icon type="cart" />
                </button>
              </div>
            )}

            <Search />
          </div>

          {isUser
            ? (
            <Link to={ROUTE.PROFILE} className="header__right-menu">
              <div className="header__user-info">
                <div className="header__user-info--text">
                  <p className="header__user-status">{role}</p>
                  <p className="header__user-name">
                    {name ? name : 'Name Surname'}
                  </p>
                </div>

                <div>
                  <img src={avatar} alt="photo" className="header__user-info--photo" />
                </div>
              </div>
            </Link>)
              : (
                <div className="header__right-menu">
                  <MainButton
                    type="button"
                    text="log in"
                    isSmall={true}
                  />
                </div>
              )}
        </div>
      </div>
    </div>
  );
};
