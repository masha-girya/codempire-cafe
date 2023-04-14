import React from 'react';
import { MainButton } from 'components/button';
import './delete-product.scss';

interface IProps {
  isError: boolean,
  handleDelete: () => void,
  handleConfirmDelete: () => void,
}

export const DeleteProduct = (props: IProps) => {
  const {
    isError,
    handleDelete,
    handleConfirmDelete,
   } = props;

  return (
    <div className="delete-product">
      {isError
        ? (
          <p className="delete-product__text">
            You can not delete this product because it is in actual order
          </p>)
        : (
          <>
            <p className="delete-product__text">
              Are you sure you want to delete this product?
            </p>

            <MainButton
              type="button"
              text="delete"
              isMiddleSize={true}
              isDanger={true}
              onHandleClick={handleDelete}
            />
          </>
        )
      }

      <MainButton
        type="button"
        text="skip"
        isMiddleSize={true}
        isSecondary={true}
        onHandleClick={handleConfirmDelete}
      />
    </div>
  );
};
