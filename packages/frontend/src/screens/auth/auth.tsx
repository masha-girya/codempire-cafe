import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthForm, AuthAddInfo } from './components';
import { HeaderAuth } from 'components/header-auth';
import { Icon } from 'components/icon';
import { useAuth } from '../../screens/auth';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './auth.scss';

interface IProps {
  isSignUp: boolean;
  isStart: boolean;
}

export const Auth = (props: IProps) => {
  const { isSignUp, isStart } = props;
  const { isUser } = useAuth();

  const headerText = useMemo(() => {
    return isSignUp ? 'sign up' : 'log in';
  }, [isSignUp]);

  return (
    <>
      <HeaderAuth text={headerText} />

      {isUser ? (
        <Navigate to={ROUTE.MAIN_PAGE_DISHES} />
      ) : (
        <div className="auth">
          {isStart ? (
            <>
              <Icon type="logo" />
              <AuthForm isSignUp={isSignUp} />
            </>
          ) : (
            <AuthAddInfo />
          )}
        </div>
      )}
    </>
  );
};
