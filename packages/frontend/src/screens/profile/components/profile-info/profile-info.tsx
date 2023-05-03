import React from 'react';
import { MainButton } from 'components/button';
import { IUser } from 'types';
import './profile-info.scss';

interface IProps {
  user: Partial<IUser>,
  handleModalOpen: () => void,
}

export const ProfileInfo = (props: IProps) => {
  const { user, handleModalOpen } = props;
  const { avatar, name, surname, role, phone } = user;

  return (
    <div className="profile-info">
      <img
        className="profile-info__photo"
        src={`data:image/png;base64,${avatar}`}
        alt="profile photo"
      />

      <div className="profile-info__info">
        <h1 className="profile-info__username">
          {name ? `${name} ${surname}` : 'Name Surname'}
        </h1>
        <p className="profile-info__status">{role}</p>
        <p className="profile-info__phone">{phone}</p>
      </div>

      <MainButton
        type="button"
        text="Edit"
        isSecondary={true}
        isSmall={true}
        onHandleClick={handleModalOpen}
      />
    </div>
  );
};
