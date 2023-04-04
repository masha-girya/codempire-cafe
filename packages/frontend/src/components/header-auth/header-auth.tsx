import React, { memo } from 'react';
import './header-auth.scss';

interface IProps {
  text: string,
}

export const HeaderAuth = memo(({ text }: IProps) => (
  <div className="header-auth">
    <p className="header-auth__text">{text}</p>
  </div>
  )
);

HeaderAuth.displayName = 'HeaderAuth';
