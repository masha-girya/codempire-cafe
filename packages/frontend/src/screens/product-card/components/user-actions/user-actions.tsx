import React from 'react';
import { MainButton } from 'components/button';
import { IProduct } from 'types';

interface IProps {
  handleRemove: () => void,
  handleAdd: () => void,
  isItemInCart: IProduct | undefined,
  isLoggedIn: boolean,
}

export const UserActions = (props: IProps) => {
  const { 
    handleAdd,
    handleRemove,
    isItemInCart,
    isLoggedIn,
   } = props;

  return (
    <>
      {isItemInCart
        ? (
          <MainButton
            type="button"
            text="Remove"
            isSmall={true}
            onHandleClick={handleRemove}
            isActive={true}
          />)
        : (
          <MainButton
            type="button"
            text="To cart"
            isSmall={true}
            onHandleClick={handleAdd}
            isDisabled={isLoggedIn}
          />)
      }
    </>
  );
};
