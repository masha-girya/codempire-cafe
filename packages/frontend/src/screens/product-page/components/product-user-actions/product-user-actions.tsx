import React from 'react';
import { MainButton } from 'components/button';
import { IProduct } from 'types';

interface IProps {
  handleRemove: () => void,
  handleAdd: () => void,
  isLoggedIn: boolean,
  itemInCart: IProduct | undefined,
}

export const ProductUserActions = (props: IProps) => {
  const {
    handleRemove,
    handleAdd,
    isLoggedIn,
    itemInCart,
  } = props;

  return (
    <>
      {itemInCart
        ? (
          <MainButton
            type="button"
            text="Remove"
            onHandleClick={handleRemove}
            isActive={true}
          />)
        : (
          <MainButton
            type="button"
            text="Add to cart"
            onHandleClick={handleAdd}
            isDisabled={isLoggedIn}
          />)
      }
    </>
  );
};
