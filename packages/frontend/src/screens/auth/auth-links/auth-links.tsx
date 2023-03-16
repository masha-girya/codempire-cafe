import React from 'react';
import { Link } from 'react-router-dom';
import './auth-links.scss';

interface IProps {
  isSignUp: boolean;
}

export const AuthLinks = (props: IProps) => {
  const { isSignUp } = props;

  return (
    <div className="auth__links">
      {isSignUp ? (
        <Link
          to="/"
          className="link"
        >
          Log In
        </Link>
      ) : (
        <>
          <Link
            to="/"
            className="link"
          >
            Forgot password?
          </Link>

          <Link
            to="/registration"
            className="link"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};
