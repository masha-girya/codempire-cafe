import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../screens/header';
import { BottomBar } from 'components/bottom-bar';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import { useAppSelector } from 'store';
import { useProfile } from '../profile';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import './profile.scss';

export const Profile = () => {
  const { isUser } = useProfile();
  const {
    name,
    phone,
    role,
    avatar,
    address: addresses,
  } = useAppSelector(state => state.user);

  if(!isUser) {
    return <Navigate to={ROUTE.ERROR} replace />;
  }

  return (
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
              {name}
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
              <Link to="/" className="profile__link" >
                <p>Change password</p>
                <Icon type="rightArrow" />
              </Link>
            </li>
            <li>
              <Link to="/" className="profile__link" >
                <p>Delete account</p>
                <Icon type="rightArrow" />
              </Link>
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
            />

            <MainButton
              type="button"
              text="Log out"
              isSecondary={true}
              isSmall={true}
            />
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};