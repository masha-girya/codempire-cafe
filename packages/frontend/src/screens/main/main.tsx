import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from 'components/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import { Sidebar } from '../main';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import { Icon } from 'components/icon';
import './main.scss';

export const Main = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate(`${ROUTE.MAIN_PAGE_MENU}`);
  };

  const handleDishClick = () => {
    navigate(`${ROUTE.MAIN_PAGE_DISH}`);
  };

  return (
    <div className="main">
      <Header />

      <div className="main__container">
        <div className="main__top-menu">
          <div className="main__buttons">
            <MainButton
              type="button"
              text="dish"
              isDisabled={false}
              onHandleClick={handleDishClick}
              isSmall={true}
            />

            <div className="main__select-button">
              <MainButton
                type="button"
                text="menu"
                isDisabled={false}
                onHandleClick={handleMenuClick}
                isSmall={true}
              />
            </div>
          </div>

          <MainButton
            type="button"
            text="Sorting by"
            isDisabled={false}
            onHandleClick={handleDishClick}
            isSecondary={true}
            isSmall={true}
            iconEnd={<Icon type="selectIcon" />}
            />
        </div>

        <Sidebar />
        <div className="main__product-list">
          <Outlet />
        </div>
      </div>

      <BottomBar />
    </div>
  );
};
