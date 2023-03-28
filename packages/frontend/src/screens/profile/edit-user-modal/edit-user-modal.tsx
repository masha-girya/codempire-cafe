import React from 'react';
import { MainButton } from 'components/button';
import { Icon } from 'components/icon';
import { Input } from 'components/input';
import { useEditUserModal } from '../../profile/edit-user-modal';
import './edit-user-modal.scss';

interface IProps {
  onHandleClose: () => void,
}

export const EditUserModal = (props: IProps) => {
  const {
    editUser,
    nameOnEdit,
    emailOnEdit,
    phoneOnEdit,
    isNameValid,
    isEmailValid,
    isPhoneValid,
    isEditOnSuccess,
    setIsEmailValid,
    setIsNameValid,
    setIsPhoneValid,
    setNameOnEdit,
    setEmailOnEdit,
    setPhoneOnEdit,
    setIsEditOnSuccess,
  } = useEditUserModal();
  const { onHandleClose } = props;

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    const successEdit = await editUser();

    if(successEdit) {
      setIsEditOnSuccess(true);
    }
  };

  const handleSuccessClose = () => {
    onHandleClose();
    setIsEditOnSuccess(false);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameValid(true);
    setNameOnEdit(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailValid(true);
    setEmailOnEdit(event.target.value);
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneValid(true);
    setPhoneOnEdit(event.target.value);
  };

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(event.target === event.currentTarget) {
      onHandleClose();
      setIsEditOnSuccess(false);
    }
  };

  return (
    <div className="edit-user-modal" onClick={handleModalClose}>
      {isEditOnSuccess
        ? (<div className="edit-user-modal__success">
           <button
              className="edit-user-modal__success--close"
              onClick={handleSuccessClose}
            >
              <Icon type="close" />
            </button>

            <h1 className="edit-user-modal__title">
              Changed successfully!
            </h1>
          </div>)
        : (
          <div className="edit-user-modal__block">
            <div className="edit-user-modal__fields">
              <h1 className="edit-user-modal__title">Change Profile</h1>
              <img
                src=""
                alt="profile photo"
                className="edit-user-modal__photo"
              />

              <MainButton
                type="button"
                text="skip"
                isSecondary={true}
                onHandleClick={onHandleClose}
              />
            </div>

            <div className="edit-user-modal__fields">
              <button
                className="edit-user-modal__close"
                onClick={onHandleClose}
              >
                <Icon type="close" />
              </button>

              <form
                className="edit-user-modal__form"
                onSubmit={handleSubmit}
              >
                <label className="edit-user-modal__form-label">
                  Name
                  <Input
                    type="text"
                    placeholder=""
                    isPass={false}
                    value={nameOnEdit || ''}
                    onChange={handleChangeName}
                    helperText={!isNameValid ? 'Enter Name and Surname' : ''}
                  />
                </label>

                <label className="edit-user-modal__form-label">
                  Email
                  <Input
                    type="email"
                    placeholder=""
                    isPass={false}
                    value={emailOnEdit || ''}
                    onChange={handleChangeEmail}
                    helperText={!isEmailValid ? 'Enter correct email: someemail@gmail.com' : ''}
                  />
                </label>

                <label className="edit-user-modal__form-label">
                  Phone
                  <Input
                    type="phone"
                    placeholder=""
                    isPass={false}
                    value={phoneOnEdit || ''}
                    onChange={handleChangePhone}
                    helperText={!isPhoneValid ? 'Enter phone by pattern: +380 99 999 99 99' : ''}
                  />
                </label>

                <div className="edit-user-modal__form-submit">
                  <MainButton
                    type="submit"
                    text="Create"
                  />
                </div>
              </form>
            </div>
          </div>)
      }
    </div>
  );
};
