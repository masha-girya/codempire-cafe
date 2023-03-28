import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../screens/header';
import { MainButton } from 'components/button';
import { BottomBar } from 'components/bottom-bar';
import { useLogout } from '../../screens/logout';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import './logout.scss';

export const Logout = () => {
  const { isUser } = useLogout();

  return (
    <>
      <Header />

      {isUser
        ? <Navigate to={ROUTE.PROFILE} replace />
        : (
          <div className="logout">
            <div className="logout__container">
              <h1 className="logout__title">
                You are unauthorized
              </h1>
  
              <Link to={ROUTE.HOME} className="logout__button-login">
                <MainButton
                  type="button"
                  text="Log in"
                />
              </Link>
  
              <Link to={ROUTE.HOME} className="logout__button-signup">
                <MainButton
                  type="button"
                  text="Sign up"
                  isSecondary={true}
                />
              </Link>
            </div>
          </div>)
      }

      <BottomBar />
    </>
  );
};
