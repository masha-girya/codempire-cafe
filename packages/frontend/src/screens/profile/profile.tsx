import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from 'screens/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import {
  AddressList,
  ProfileInfo,
  ProfileSettings,
} from './components';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import { useProfile } from '../profile';
import './profile.scss';

export const Profile = () => {
  const {
    user,
    isUser,
    handleOpenAddress,
    handleLogOut,
    handleModalOpen,
  } = useProfile();

  return (
    <>
      {isUser ? (
        <div>
          <Outlet />

          <Header />

          <div className="profile">
            <ProfileInfo
              user={user}
              handleModalOpen={handleModalOpen}
            />

            <div>
              <ProfileSettings />

              <ul className="profile__addresses">
                <li>
                  <button
                    className="profile__addresses-open profile__title"
                    onClick={handleOpenAddress}
                  >
                    Addresses
                    <Icon type="plus" />
                  </button>
                </li>

                <AddressList />
              </ul>

              <div className="profile__actions">
                <MainButton
                  type="button"
                  text="Log out"
                  isSecondary={true}
                  isSmall={true}
                  onHandleClick={handleLogOut}
                />
              </div>
            </div>
          </div>

          <BottomBar />
        </div>
      ) : (
        <Navigate to={ROUTE.HOME} replace />
      )}
    </>
  );
};
