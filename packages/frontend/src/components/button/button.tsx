import React from 'react';
import classnames from 'classnames';
import { TButton } from '../button';
import './button.scss';

interface IProps {
  text: string,
  type: TButton,
  isDisabled?: boolean,
  onHandleClick?: () => void,
  iconStart?: React.ReactNode,
  iconEnd?: React.ReactNode,
  isSmall?: boolean,
  isSecondary?: boolean,
  isActive?: boolean,
  isSuperSmall?: boolean,
  isMiddleSize?: boolean,
  isDanger?: boolean,
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
    isActive,
    isSuperSmall,
    isMiddleSize,
    isDanger,
  } = props;

  return (
      <button
        type={type}
        disabled={isDisabled}
        onClick={onHandleClick}
        className={classnames('button', {
          'button--small': isSmall,
          'button--super-small': isSuperSmall,
          'button--secondary': isSecondary,
          'button--active': isActive,
          'button--middle': isMiddleSize,
          'button--danger': isDanger,
        })}
      >
        {iconStart}
        {text}
        {iconEnd}
      </button>
  );
};
