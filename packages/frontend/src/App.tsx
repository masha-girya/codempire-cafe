import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from 'screens/auth';
import { Error } from 'components/error';
import { Main } from 'screens/main';
import { ProductPage } from 'screens/product-page';
import { Profile } from 'screens/profile';
import { Modal } from 'screens/modal';
import { Logout } from 'screens/logout';
import { Orders } from 'screens/orders';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';

const App: React.FC = () => {
  return (
    <Routes>
      {/* AUTH */}
      <Route path={ROUTE.HOME} element={
          <Auth isSignUp={false}isStart={true} />
        }
      />

      <Route path={ROUTE.REGISTRATION} element={
          <Auth isSignUp={true} isStart={true} />
        }
      />

      <Route path={ROUTE.REGISTRATION_ADD_INFO} element={
          <Auth isSignUp={true} isStart={false} />
        }
      />

      {/* MAIN */}
      <Route path={ROUTE.MAIN_PAGE} element={
          <Navigate to={ROUTE.MAIN_PAGE_DISH} replace />
        }
      />

      <Route path={ROUTE.MAIN_PAGE_DISH} element={<Main />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
      </Route>

      <Route path={ROUTE.MAIN_PAGE_MENU} element={<Main />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
      </Route>

      {/* PRODUCT PAGE */}
      <Route path={`${ROUTE.MAIN_PAGE_MENU}/:id`} element={
          <ProductPage />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
      </Route>

      <Route path={`${ROUTE.MAIN_PAGE_DISH}/:id`} element={
          <ProductPage />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
      </Route>

      <Route path={`${ROUTE.DISH_EDIT}/:id`} element={<ProductPage />} />
      <Route path={`${ROUTE.MENU_EDIT}/:id`} element={<ProductPage />} />

      {/* PROFILE */}
      <Route path={ROUTE.PROFILE} element={<Profile />}>
        <Route path={ROUTE.CART} element={<Modal />} />

        <Route path={ROUTE.ORDER} element={<Modal />} />

        <Route path={ROUTE.PROFILE_EDIT_USER} element={<Modal />} />

        <Route path={ROUTE.PROFILE_CHANGE_PASS} element={<Modal />} />

        <Route path={ROUTE.PROFILE_CHANGE_ADDRESS} element={<Modal />} />
      </Route>

      {/* ORDERS */}
      <Route path={ROUTE.ORDERS} element={
        <Navigate to={ROUTE.ORDERS_WAITING} replace/>}
      />

      <Route path={ROUTE.ORDERS_COMPLETED} element={<Orders />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path=":number" element={<Modal />} />
      </Route>

      <Route path={ROUTE.ORDERS_WAITING} element={<Orders />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path=":number" element={<Modal />} />
      </Route>

      {/* LOGOUT */}
      <Route path={ROUTE.PROFILE_LOGOUT} element={<Logout />} />

      {/* ERROR */}
      <Route path={ROUTE.ERROR} element={<Error />} />
    </Routes>
  );
};

export default App;
