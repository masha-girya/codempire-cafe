import React from 'react';
import { MainButton } from 'components/button';
import { useProductActions } from './product-actions.state';
import { IDish, IMenu } from 'types';
import './product-actions.scss';

interface IProps {
  product: IDish | IMenu,
}

export const ProductActions = ({ product } : IProps) => {
  const {
    price,
    weight,
  } = product;

  const {
    isItemInCart,
    handleRemove,
    handleAdd,
  } = useProductActions({ product });

  return (
    <div className="actions">
      <div className="actions__price">
        <h2 className="actions__price--text">
          {`${price}uah`}
        </h2>

        <h2 className="actions__price--text">
          {`${weight}g`}
        </h2>
      </div>

      <div className="actions__buttons">
      {isItemInCart
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
          />)
      }
        <MainButton
          type="button"
          text="Skip"
          isSecondary={true}
          onHandleClick={handleRemove}
        />
      </div>
    </div>
  );
};
