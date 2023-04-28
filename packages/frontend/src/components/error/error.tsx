import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderAuth } from 'components/header-auth';
import './error.scss';

export const Error = () => {
  return (
    <>
      <HeaderAuth text="error" />

      <div className="error">
        <h1 className="error__message">Page not found</h1>
        <Link to='/' className="error__link">Go Home</Link>
      </div>
    </>
  );
};
