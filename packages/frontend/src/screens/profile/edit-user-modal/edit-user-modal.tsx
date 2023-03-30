import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from 'components/button';
import { Input } from 'components/input';
import { useEditUserModal } from '../../profile/edit-user-modal';
import './edit-user-modal.scss';

interface IProps {
  setSuccess: Dispatch<SetStateAction<boolean>>,
}

export const EditUserModal = (props: IProps) => {
  const { setSuccess } = props;
  const navigate = useNavigate();

  const {
    editUser,
    nameOnEdit,
    emailOnEdit,
    phoneOnEdit,
    isNameValid,
    isEmailValid,
    isPhoneValid,
    setIsEmailValid,
    setIsNameValid,
    setIsPhoneValid,
    setNameOnEdit,
    setEmailOnEdit,
    setPhoneOnEdit,
  } = useEditUserModal();

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    const successEdit = await editUser();

    if(successEdit) {
      setSuccess(true);
    }
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

  const handleClose = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-user-modal">
      <div className="edit-user-modal__fields">
        <img
          src=""
          alt="profile photo"
          className="edit-user-modal__photo"
        />

        <MainButton
          type="button"
          text="skip"
          isSecondary={true}
          onHandleClick={handleClose}
        />
      </div>

      <div className="edit-user-modal__fields">
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
    </div>
  );
};
