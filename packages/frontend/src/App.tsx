import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from 'screens/auth';
import { Error } from 'components/error';
import { Main } from 'screens/main';
import { ProductPage } from 'screens/product-page';
import { Modal, Profile } from 'screens/profile';
import { Logout } from 'screens/logout';
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

      <Route path={ROUTE.MAIN_PAGE_DISH} element={
          <Main />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
      </Route>

      <Route path={ROUTE.MAIN_PAGE_MENU} element={
          <Main />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
      </Route>

      {/* PRODUCT PAGE */}

      <Route path={`${ROUTE.MAIN_PAGE_MENU}/:id`} element={
          <ProductPage />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
      </Route>

      <Route path={`${ROUTE.MAIN_PAGE_DISH}/:id`} element={
          <ProductPage />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
      </Route>

      {/* PROFILE */}
      <Route path={ROUTE.PROFILE} element={<Profile />}>
        <Route path={ROUTE.CART} element={<Modal />} />

        <Route path={ROUTE.PROFILE_EDIT_USER} element={<Modal />} />

        <Route path={ROUTE.PROFILE_CHANGE_PASS} element={<Modal />} />

        <Route path={ROUTE.PROFILE_CHANGE_ADDRESS} element={<Modal />} />
      </Route>

      {/* LOGOUT */}
      <Route path={ROUTE.PROFILE_LOGOUT} element={<Logout />} />

      {/* ERROR */}
      <Route path={ROUTE.ERROR} element={<Error />} />
    </Routes>
  );
};

export default App;
