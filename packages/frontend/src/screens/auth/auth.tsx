import React, { useMemo } from 'react';
import { AuthForm, AuthAddInfo } from '../../screens/auth';
import { HeaderAuth } from 'components/header-auth';
import { Icon } from 'components/icon';
import './auth.scss';

interface IProps {
  isSignUp: boolean,
  isStart: boolean,
}

export const Auth = (props: IProps) => {
  const { isSignUp, isStart } = props;

  const headerText = useMemo(() => {
    return isSignUp ? 'sign up' : 'log in';
  }, [isSignUp]);

  return (
    <>
      <HeaderAuth text={headerText} />

      <div className="auth">
        {isStart
          ? (
            <>
              <Icon type="logo" />
              <AuthForm isSignUp={isSignUp} />
            </>
          )
          : <AuthAddInfo />}
      </div>
    </>
  );
};
