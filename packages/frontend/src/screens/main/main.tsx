import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Header } from 'components/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import { Sidebar, FilterContextProvider } from '../main';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import './main.scss';

export const Main = () => {
  const location = useLocation();

  return (
    <div className="main">
      <Header />

      <div className="main__container">
        <div className="main__top-menu">
          <div className="main__buttons">
            <Link to={ROUTE.MAIN_PAGE_DISH}>
              <MainButton
                type="button"
                text="dish"
                isDisabled={false}
                isSmall={true}
                isActive={location.pathname === ROUTE.MAIN_PAGE_DISH}
              />
            </Link>

            <Link to={ROUTE.MAIN_PAGE_MENU}>
              <MainButton
                type="button"
                text="menu"
                isDisabled={false}
                isSmall={true}
                isActive={location.pathname === ROUTE.MAIN_PAGE_MENU}
              />
            </Link>
          </div>

          <div className="main__select-button">
            <MainButton
              type="button"
              text="Sorting by"
              isDisabled={false}
              isSecondary={true}
              isSmall={true}
              iconEnd={<Icon type="selectIcon" />}
            />
          </div>
        </div>

        <div className="main__grid-container">
          <FilterContextProvider>
            <Sidebar />
            <Outlet />
          </FilterContextProvider>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};
