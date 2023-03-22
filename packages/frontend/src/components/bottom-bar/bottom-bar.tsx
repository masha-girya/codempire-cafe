import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from 'components/icon';
import { NAVIGATION_CONSTANTS as navigation } from 'utils/constants';
import './bottom-bar.scss';


export const BottomBar = () => {
  const location = useLocation();

  return (
    <div className="container">
      <nav className="bottom-bar">
        {navigation.map(nav => (
          <NavLink
            key={nav}
            to={`/${nav}`}
            className={classNames('bottom-bar__nav', {
              'bottom-bar__nav--is-active': location.pathname.includes(nav),
            })}
          >
            <Icon type={nav} />
            <p className="bottom-bar__nav--text">{nav}</p>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
