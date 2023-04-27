import React from 'react';
import { MainButton } from 'components/button';
import { IMenu, IDish } from 'types';
import { useUserActions } from './user-actions.state';

interface IProps {
  card: IMenu | IDish,
  id: string,
}

export const UserActions = (props: IProps) => {
  const { id, card } = props;

   const {
    handleAdd,
    handleRemove,
    isItemInCart,
    isLoggedIn,
    isOnAction,
  } = useUserActions({ card, id });

  return (
    <>
      {isItemInCart
        ? (
          <MainButton
            type="button"
            text={isOnAction ? 'Added!' : 'Remove'}
            isSmall={true}
            onHandleClick={handleRemove}
            isActive={true}
            isDisabled={isOnAction}
          />)
        : (
          <MainButton
            type="button"
            text={isOnAction ? 'Removed!' : 'To cart'}
            isSmall={true}
            onHandleClick={handleAdd}
            isDisabled={isLoggedIn || isOnAction}
          />)
      }
    </>
  );
};
