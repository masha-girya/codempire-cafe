import React, { useMemo } from 'react';
import { Input } from 'components/input';
import { MainButton } from 'components/button';
import { AuthLinks } from '../../../screens/auth';
import { useAppDispatch } from 'store';
import { validateEmail } from 'utils/helpers';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import {userActions } from 'store/features';
import {
  useAuth,
  useAuthForm,
  useAuthRequest,
  login,
  signUp,
} from '../../../screens/auth';
import './auth-form.scss';

interface IProps {
  isSignUp: boolean,
}

export const AuthForm = (props: IProps) => {
  const { isSignUp } = props;
  const dispatch = useAppDispatch();
  const {
    sendAuthRequest,
    isError,
    setIsError,
  } = useAuthRequest();

  const {
    navigate,
    isValidEmail,
    setIsValidEmail,
  } = useAuth();

  const {
    enteredEmail,
    enteredPassword,
    isButtonDisabled,
    setEnteredEmail,
    setEnteredPassword,
  } = useAuthForm();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setIsValidEmail(true);
    setEnteredEmail(event.target.value);
  };

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setEnteredPassword(event.target.value);
  };

  const buttonText = useMemo(() => {
    return isSignUp ? 'Create' : 'Log in';
  }, [isSignUp]);

  const handleSubmit = async(event: React.FormEvent) => {
    event?.preventDefault();

    if(!validateEmail(enteredEmail)) {
      setIsValidEmail(false);
      return;
    }

    switch(isSignUp) {
      case true:
        await sendAuthRequest(async() => {
          const res = await signUp(enteredEmail, enteredPassword);
          if(res) {
            dispatch(userActions.setId(res.id));
            await login(enteredEmail, enteredPassword);
            navigate(ROUTE.REGISTRATION_ADD_INFO);
          }
        });
        break;

      case false:
        await sendAuthRequest(async() => {
          const res = await login(enteredEmail, enteredPassword);
          if (res) {
            navigate(ROUTE.MAIN_PAGE_DISH);
          }
        });
        break;

      default:
        break;
    }
  };

  const handleSkipClick = () => {
    navigate(ROUTE.MAIN_PAGE_DISH);
  };

  return (
    <form
      className="auth-form__form-field"
      onSubmit={handleSubmit}
    >
      <div className="auth-form__input">
        <Input
          type="email"
          placeholder="Email"
          value={enteredEmail}
          onChange={handleEmailChange}
          isPass={false}
          helperText={!isValidEmail ? 'Please, write a correct email': ''}
        />
      </div>

      <div className="auth-form__input">
        <Input
          type="password"
          placeholder="Password"
          value={enteredPassword}
          onChange={handlePassChange}
          isPass={true}
        />
      </div>

      <div className="auth__links">
        <AuthLinks isSignUp={isSignUp} />
      </div>

      {(isError && isSignUp) && (
        <p className="auth-form__error">
          User with this email is already exists
        </p>
      )}

      {(isError && !isSignUp) && (
        <p className="auth-form__error">
          You have entered wrong password or email
        </p>
      )}

      <div className="auth-form__button">
        <MainButton
          text={buttonText}
          type="submit"
          isDisabled={isButtonDisabled}
        />
      </div>

      <div className="auth-form__button">
        <MainButton
          text="skip"
          type="button"
          onHandleClick={handleSkipClick}
          isSecondary={true}
          isSmall={true}
        />
      </div>
    </form>
  );
};
