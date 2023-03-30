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
    surname,
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
              <div className="header__user-info">
                <Link to={ROUTE.PROFILE} className="header__right-menu">
                  <div className="header__user-info--text">
                    <p className="header__user-status">{role}</p>
                    <p className="header__user-name">
                      {name ? `${name} ${surname}` : 'Name Surname'}
                    </p>
                  </div>

                  <div>
                    <img src={`data:image/png;base64,${avatar}`} alt="photo" className="header__user-info--photo" />
                  </div>
                </Link>
              </div>)
              : (
                <Link to={ROUTE.HOME} className="header__right-menu">
                  <MainButton
                    type="button"
                    text="log in"
                    isSmall={true}
                  />
                </Link>
              )}
        </div>
      </div>
    </div>
  );
};
