import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import { Modal } from '../profile/modal';
import { useAppSelector } from 'store';
import { deleteUser, useProfile } from '../profile';
import { removeLocalItem } from 'utils/helpers';
import { validateToken } from '../../screens/auth';
import {
  ROUTE_CONSTANTS as ROUTE,
  STORAGE_CONSTANTS as STORAGE,
} from 'utils/constants';
import './profile.scss';

interface IProps {
  isPassOnEdit?: boolean,
  isUserOnEdit?: boolean,
}

export const Profile = (props: IProps) => {
  const { isPassOnEdit, isUserOnEdit } = props;

  const {
    isUser,
    navigate,
    removeUser,
    sendUniqueRequest,
  } = useProfile();

  const {
    id,
    name,
    phone,
    role,
    avatar,
    surname,
    address: addresses,
  } = useAppSelector(state => state.user);

  const handleModalOpen = () => {
    navigate(ROUTE.PROFILE_EDIT_USER);
  };

  const handleLogOut = () => {
    removeLocalItem(STORAGE.ACCESS_TOKEN);
    navigate(ROUTE.PROFILE_LOGOUT);
    removeUser();
  };

  const handleDeleteAccount = async() => {
    const localToken = await validateToken();

    await sendUniqueRequest(async() => {
      deleteUser(id, localToken?.token || '');
    });

    removeLocalItem(STORAGE.ACCESS_TOKEN);
    navigate(ROUTE.PROFILE_LOGOUT);
  };

  return (
    <>
    {isPassOnEdit && (
      <Modal
        isPass={true}
      />
    )}

    {isUserOnEdit && (
      <Modal
        isPass={false}
      />
    )}

      {isUser
        ? (
          <div>
            <Header />

            <div className="profile">
              <div className="profile__user">
                <img
                  className="profile__photo"
                  src={avatar}
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
                  <li>Settings</li>

                  <li>
                    <Link to="/" className="profile__link" >
                      <p>Privacy policy</p>
                      <Icon type="rightArrow" />
                    </Link>
                  </li>

                  <li>
                    <Link to={ROUTE.PROFILE_CHANGE_PASS} className="profile__link" >
                      <p>Change password</p>
                      <Icon type="rightArrow" />
                    </Link>
                  </li>
                  <li>
                    <div className="profile__link" >
                      <button className="profile__link--delete" onClick={handleDeleteAccount}>
                        <p>Delete account</p>
                        <Icon type="rightArrow" />
                      </button>
                    </div>
                  </li>
                  <li>
                    <Link to="/" className="profile__link" >
                      <p>Orders</p>
                      <Icon type="rightArrow" />
                    </Link>
                  </li>
                </ul>

                <ul className="profile__addresses">
                  <li>
                    <button className="profile__add-address" >
                      Addresses
                      <Icon type="plus" />
                    </button>
                  </li>

                  {addresses.map(address => (
                    <li key={address} className="profile__link profile__link--address">
                      <p>{address}</p>
                    </li>
                  ))}
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
          </div>)
        : <Navigate to={ROUTE.HOME} replace />
      }
    </>
  );
};