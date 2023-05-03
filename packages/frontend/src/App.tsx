import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth } from 'screens/auth';
import { Error } from 'components/error';
import { PrivacyPolicy } from 'components/privacy-policy';
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
      <Route path="*" element={<Error />} />

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
      <Route path={ROUTE.MAIN_PAGE} element={<Main />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      <Route path={ROUTE.MAIN_PAGE_DISHES} element={<Main />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      <Route path={ROUTE.MAIN_PAGE_MENUS} element={<Main />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      {/* PRODUCT PAGE */}
      <Route path={ROUTE.MAIN_PAGE_MENU} element={
          <ProductPage />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      <Route path={ROUTE.MAIN_PAGE_DISH} element={
          <ProductPage />
        }
      >
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      <Route path={ROUTE.DISH_EDIT_ID} element={<ProductPage />}>
        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      <Route path={ROUTE.MENU_EDIT_ID} element={<ProductPage />}>
        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      <Route path={ROUTE.DISH_ADD} element={<ProductPage />}>
        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      <Route path={ROUTE.MENU_ADD} element={<ProductPage />}>
        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      {/* PROFILE */}
      <Route path={ROUTE.PROFILE} element={<Profile />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.PROFILE_EDIT_USER} element={<Modal />} />
        <Route path={ROUTE.PROFILE_CHANGE_PASS} element={<Modal />} />
        <Route path={ROUTE.PROFILE_CHANGE_ADDRESS} element={<Modal />} />
        <Route path={ROUTE.PROFILE_DELETE_ACCOUNT} element={<Modal />} />
        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
      </Route>

      {/* ORDERS */}
      <Route path={ROUTE.ORDERS} element={<Orders />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
        <Route path={ROUTE.NUMBER} element={<Modal />} />
      </Route>

      <Route path={ROUTE.ORDERS_COMPLETED} element={<Orders />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
        <Route path={ROUTE.NUMBER} element={<Modal />} />
      </Route>

      <Route path={ROUTE.ORDERS_WAITING} element={<Orders />}>
        <Route path={ROUTE.CART} element={<Modal />} />
        <Route path={ROUTE.ORDER} element={<Modal />} />
        <Route path={ROUTE.PAYMENT} element={<Modal />} />

        <Route path={ROUTE.NOTIFICATIONS} element={<Modal />} />
        <Route path={ROUTE.NUMBER} element={<Modal />} />
      </Route>

      {/* LOGOUT */}
      <Route path={ROUTE.PROFILE_LOGOUT} element={<Logout />} />

      {/* ERROR */}
      <Route path={ROUTE.ERROR} element={<Error />} />

      {/* PRIVACY POLICY */}
      <Route path={ROUTE.PRIVACY_POLICY} element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default App;
