import React from 'react';
import './loader.scss';

interface IProps {
  isDark?: boolean,
}

export const Loader = ({ isDark }: IProps) => {
  return (
    <div className="loader">
      {Array(3).fill(0).map((dot, i) => (
        <div
          className={isDark
            ? 'loader__dot loader__dot--dark'
            : 'loader__dot'}
          key={i}
        ></div>
      ))}
      {/* <div className="loader__dot"></div>
      <div className="loader__dot"></div>
      <div className="loader__dot"></div> */}
    </div>
  );
};
