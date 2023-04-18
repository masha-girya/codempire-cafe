import React from 'react';
import { Navigate } from 'react-router-dom';
import { ManagerActions } from 'screens/manager-actions';
import { ProductUserActions } from '../product-user-actions';
import { useProductActions } from './product-actions.state';
import { IDish, IMenu } from 'types';
import { ROUTE_CONSTANTS } from 'constants-app';
import './product-actions.scss';

interface IProps {
  product: IDish | IMenu,
}

export const ProductActions = ({ product } : IProps) => {
  const {
    price,
    weight,
    id,
  } = product;

  const {
    isReload,
    isManager,
    isLoggedIn,
    itemInCart,
    handleRemove,
    handleAdd,
    handleReload,
  } = useProductActions({ product });

  if(isReload) {
    return <Navigate to={ROUTE_CONSTANTS.MAIN_PAGE_DISH} replace />;
  }

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
        {isManager
          ? (
            <ManagerActions
              id={id}
              isMenu={'dishesId' in product}
              handleReload={handleReload}
            />
          )
          : (
            <ProductUserActions
              handleRemove={handleRemove}
              handleAdd={handleAdd}
              itemInCart={itemInCart}
              isLoggedIn={isLoggedIn}
            />)
        }
      </div>
    </div>
  );
};
