import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { MainButton } from 'components/button';
import { Search } from 'screens/search';
import { HeaderNotifications, HeaderUser } from './components';
import { useHeader } from '../header';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './header.scss';

export const Header = () => {
  const { isUser } = useHeader();

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__container-menus">
          <div className="header__menu">
            <div className="header__logo">
              <Link to={ROUTE.MAIN_PAGE_DISHES}>
                <Icon type="logoWhite" />
              </Link>
            </div>

            {isUser && <HeaderNotifications />}

            <Search />
          </div>

          {isUser
            ? <HeaderUser />
            : (
              <Link to={ROUTE.HOME} className="header__menu">
                <MainButton
                  type="button"
                  text="log in"
                  isSmall={true}
                />
              </Link>)
          }
        </div>
      </div>
    </div>
  );
};
