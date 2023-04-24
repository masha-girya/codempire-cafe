import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import {
  Sidebar,
  ProductList,
  TopMenu,
} from './components';
import { FilterContextProvider } from '../main';
import { PATHNAME_CONSTANTS as PATHNAME } from 'constants-app';
import './main.scss';

export const Main = () => {
  const location = useLocation();

  const locationMenu = location.pathname.includes(PATHNAME.MENUS);
  const locationDish = location.pathname.includes(PATHNAME.DISHES);

  return (
    <div className="main">
      <Header />

      <div className="main__container">
        <FilterContextProvider>
          <TopMenu
            isLocationDish={locationDish}
            isLocationMenu={locationMenu}
          />

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
