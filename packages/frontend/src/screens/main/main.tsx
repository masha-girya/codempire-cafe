import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import {
  Sidebar,
  Selection,
  ProductList,
} from './components';
import { FilterContextProvider } from '../main';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './main.scss';

export const Main = () => {
  const location = useLocation();

  const locationMenu = location.pathname.includes('menus');
  const locationDish = location.pathname.includes('dishes');

  return (
    <div className="main">
      <Header />

      <div className="main__container">
        <FilterContextProvider>
          <div className="main__top-menu">
            <div className="main__buttons">
              <Link to={ROUTE.MAIN_PAGE_DISH}>
                <MainButton
                  type="button"
                  text="dish"
                  isSmall={true}
                  isActive={locationDish}
                />
              </Link>

              <Link to={ROUTE.MAIN_PAGE_MENU}>
                <MainButton
                  type="button"
                  text="menu"
                  isSmall={true}
                  isActive={locationMenu}
                />
              </Link>
            </div>

            <div className="main__select-button">
              <Selection />
            </div>
          </div>

          <div className="main__grid-container">
            <Sidebar />

            {locationMenu && <ProductList productOnLoad="menus" />}

            {locationDish && <ProductList productOnLoad="dishes" />}

            <Outlet />
          </div>
        </FilterContextProvider>
      </div>

      <BottomBar />
    </div>
  );
};
