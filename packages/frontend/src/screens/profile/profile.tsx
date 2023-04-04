import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import { AddressList, useProfile } from '../profile';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './profile.scss';

export const Profile = () => {
  const {
    name,
    phone,
    role,
    avatar,
    surname,
    isUser,
    handleOpenAddress,
    handleDeleteAccount,
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
            <div className="profile__user">
              <img
                className="profile__photo"
                src={`data:image/png;base64,${avatar}`}
                alt="profile photo"
              />

              <div className="profile__info">
                <h1 className="profile__username">
                  {name ? `${name} ${surname}` : 'Name Surname'}
                </h1>
                <p className="profile__status">{role}</p>
                <p className="profile__phone">{phone}</p>
              </div>
            </div>

            <div>
              <ul className="profile__settings">
                <li className="profile__title">Settings</li>

                <li>
                  <Link to="/" className="profile__link">
                    <p>Privacy policy</p>
                    <Icon type="rightArrow" />
                  </Link>
                </li>

                <li>
                  <Link
                    to={ROUTE.PROFILE_CHANGE_PASS}
                    className="profile__link"
                  >
                    <p>Change password</p>
                    <Icon type="rightArrow" />
                  </Link>
                </li>

                <li>
                  <div className="profile__link">
                    <button
                      className="profile__link--delete"
                      onClick={handleDeleteAccount}
                    >
                      <p>Delete account</p>
                      <Icon type="rightArrow" />
                    </button>
                  </div>
                </li>

                <li>
                  <Link to="/" className="profile__link">
                    <p>Orders</p>
                    <Icon type="rightArrow" />
                  </Link>
                </li>
              </ul>

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
                  text="Edit"
                  isSecondary={true}
                  isSmall={true}
                  onHandleClick={handleModalOpen}
                />

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
