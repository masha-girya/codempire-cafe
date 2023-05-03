import React from 'react';
import { MainButton } from 'components/button';
import { useDeleteAccount } from './delete-account.state';
import './delete-account.scss';

export const DeleteAccount = () => {
  const { handleDeleteAccount, handleSkip } = useDeleteAccount();

  return (
    <div className="delete-account">
      <h2 className="delete-account__title">
        Are you sure you want to delete your account?
      </h2>

      <h4 className="delete-account__text">
        In case you press the confirm button it can not be canceled
      </h4>

      <div className="delete-account__actions">
        <MainButton
          type="button"
          text="Skip"
          onHandleClick={handleSkip}
          isSecondary={true}
        />

        <MainButton
          type="button"
          text="Delete account"
          onHandleClick={handleDeleteAccount}
        />
      </div>
    </div>
  );
};
