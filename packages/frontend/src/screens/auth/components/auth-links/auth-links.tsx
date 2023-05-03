import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './auth-links.scss';

interface IProps {
  isSignUp: boolean;
}

export const AuthLinks = (props: IProps) => {
  const { isSignUp } = props;

  return (
    <>
      {isSignUp ? (
        <Link to={ROUTE.HOME} className="link">
          Log In
        </Link>
      ) : (
        <>
          {/* <Link to={ROUTE.HOME} className="link">
            Forgot password?
          </Link> */}

          <Link to={ROUTE.REGISTRATION} className="link">
            Sign up
          </Link>
        </>
      )}
    </>
  );
};
