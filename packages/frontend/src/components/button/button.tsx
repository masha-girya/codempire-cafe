import React from 'react';
import classnames from 'classnames';
import { TButton } from '../button';
import './button.scss';

interface IProps {
  text: string,
  type: TButton,
  isDisabled: boolean,
  onHandleClick: () => void,
  iconStart?: React.ReactNode,
  iconEnd?: React.ReactNode,
  isSmall?: boolean,
  isSecondary?: boolean,
}

export const MainButton = (props: IProps) => {
  const {
    text,
    type,
    isDisabled,
    onHandleClick,
    iconStart,
    iconEnd,
    isSmall,
    isSecondary,
  } = props;

  return (
      <button
        type={type}
        disabled={isDisabled}
        onClick={onHandleClick}
        className={classnames('button', {
          'button--small': isSmall,
          'button--secondary': isSecondary,
        })}
      >
        {iconStart}
        {text}
        {iconEnd}
      </button>
  );
};
