import React from 'react';
import { Input } from 'components/input';
import { MainButton } from 'components/button';
import { AuthLinks } from '../../components';
import { useAuthForm } from './auth-form.state';
import './auth-form.scss';

interface IProps {
  isSignUp: boolean;
}

export const AuthForm = (props: IProps) => {
  const { isSignUp } = props;

  const {
    formik,
    isError,
    isButtonDisabled,
    handleSkipClick,
    isLoading,
  } = useAuthForm({ isSignUp });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <form className="auth-form__form-field" onSubmit={handleSubmit}>
      <div className="auth-form__input">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
      </div>

      <div className="auth-form__input">
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          isPass={true}
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
      </div>

      <div className="auth__links">
        <AuthLinks isSignUp={isSignUp} />
      </div>

      {isError && isSignUp && (
        <p className="auth-form__error">
          User with this email is already exists
        </p>
      )}

      {isError && !isSignUp && (
        <p className="auth-form__error">
          You have entered wrong password or email
        </p>
      )}

      <div className="auth-form__button">
        <MainButton
          text={isSignUp ? 'Create' : 'Log in'}
          type="submit"
          isDisabled={isButtonDisabled || isLoading}
          isLoading={isLoading}
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
