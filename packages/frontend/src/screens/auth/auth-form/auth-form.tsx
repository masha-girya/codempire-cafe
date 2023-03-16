import React, { useMemo } from 'react';
import { Input } from 'components/input';
import { MainButton } from 'components/button';
import { AuthLinks } from '../../../screens/auth';
import { useAppDispatch } from 'store';
import { validateEmail } from 'utils/helpers';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import { setEmail, setPassword } from 'store/features';
import {
  useAuth,
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
    email,
    password,
    isButtonDisabled,
    navigate,
    isValidEmail,
    setIsValidEmail,
  } = useAuth();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setIsValidEmail(true);
    dispatch(setEmail(event.target.value));
  };

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    dispatch(setPassword(event.target.value));
  };

  const buttonText = useMemo(() => {
    return isSignUp ? 'Create' : 'Log in';
  }, [isSignUp]);

  const handleSubmit = async(event: React.FormEvent) => {
    event?.preventDefault();

    if(!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }

    switch(isSignUp) {
      case true:
        await sendAuthRequest(async() => {
          const res = await signUp(email, password);
          if(res) {
            navigate(ROUTE.REGISTRATION_ADD_INFO);
          }
        });
        break;

      case false:
        await sendAuthRequest(async() => {
          const res = await login(email, password);
          if (res) {
            navigate(ROUTE.MAIN_PAGE);
          }
        });
        break;

      default:
        break;
    }
  };

  const handleSkipClick = () => {
    navigate(ROUTE.MAIN_PAGE);
  };

  return (
    <form
      className="auth-form__form-field"
      onSubmit={handleSubmit}
    >
      <div className="auth-form__input">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          isPass={false}
          helperText={!isValidEmail ? 'Please, write a correct email': ''}
        />
      </div>

      <div className="auth-form__input">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassChange}
          isPass={true}
        />
      </div>

      <AuthLinks isSignUp={isSignUp} />

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
            isDisabled={false}
            onHandleClick={handleSkipClick}
            isSecondary={true}
            isSmall={true}
          />
        </div>
    </form>
  );
};
