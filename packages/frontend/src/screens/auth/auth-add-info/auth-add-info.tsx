import React from 'react';
import { Input } from 'components/input';
import { MainButton } from 'components/button';
import { useAppDispatch } from 'store';
import { validateName, validatePhone } from 'utils/helpers';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import { setName, setPhone } from 'store/features';
import {
  useAuth,
  updateUser,
  useAuthRequest,
  login,
} from '../../../screens/auth';
import './auth-add-info.scss';

export const AuthAddInfo = () => {
  const dispatch = useAppDispatch();
  const { sendAuthRequest } = useAuthRequest();
  const {
    isNameValid,
    setIsNameValid,
    isPhoneValid,
    setIsPhoneValid,
    email,
    password,
    name,
    phone,
    navigate,
  } = useAuth();

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    const validName = validateName(name);
    const isPhoneValid = validatePhone(phone);

    if(!validName) {
      setIsNameValid(false);
      return;
    }

    if(!isPhoneValid) {
      setIsPhoneValid(false);
      return;
    }

    await sendAuthRequest(async() => {
      const res = await Promise.all([
        login(email, password),
        updateUser({ email, name: validName[0], surname: validName[1], phone })
      ]);

      if(res) {
        navigate(ROUTE.MAIN_PAGE_DISH);
        return;
      }

      navigate(ROUTE.ERROR);
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameValid(true);
    dispatch(setName(event?.target.value));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneValid(true);
    dispatch(setPhone(event?.target.value));
  };

  return (
    <div className="auth-add-info">
      <div className="auth-add-info__title-block">
        <h1 className="auth-add-info__title">Welcome!</h1>
        <h3 className="auth-add-info__title--secondary">
          Just one little step left
        </h3>
      </div>

      <form
        className="auth-add-info__input-block"
        onSubmit={handleSubmit}
      >
        <h3 className="auth-add-info__subtitle">
          Enter your name:
        </h3>

        <Input
          type="text"
          placeholder="Name Surname"
          value={name}
          onChange={handleNameChange}
          isPass={false}
          helperText={!isNameValid ? 'Please, write by this pattern: Name Surname' : ''}
        />

        <h3 className="auth-add-info__subtitle">
          Enter your phone number:
        </h3>

        <Input
          type="text"
          placeholder="Format +380 99 999 99 99"
          value={phone}
          onChange={handlePhoneChange}
          isPass={false}
          helperText={!isPhoneValid ? 'Please, write by this pattern: +380 99 999 99 99' : ''}
        />

        <div className="auth-add-info__button">
          <MainButton
            text="Next"
            type="submit"
            isDisabled={false}
          />
        </div>
      </form>
    </div>
  );
};
