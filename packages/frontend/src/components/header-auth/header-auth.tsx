import React from 'react';
import './header-auth.scss';

interface IProps {
  text: string,
}

export const HeaderAuth = (props: IProps) => {
  const { text } = props;

  return (
    <div className="header-auth">
      <p className="header-auth__text">{text}</p>
    </div>
  );
};
