import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from 'components/button';
import { CartItem } from './components';
import { useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';
import './cart-modal.scss';

interface IProps {
  pathname: string,
}

export const CartModal = ({ pathname }: IProps) => {
  const navigate = useNavigate();
  const { products, totalPrice } = useAppSelector(state => state.cart);

  const handleSkipClick = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    const index = pathname.indexOf('/cart');
    const newPath = pathname.slice(0, index);

    navigate(`${newPath}/${ROUTE.ORDER}`);
  };

  return (
    <div className="cart">
      <div className="cart__items">
        {products.map(item => (
            <CartItem product={item} key={item.product.id} />
          )
        )}
      </div>

      <div className="cart__total">
        <div className="cart__box">
          <h3 className="cart__main-text">Total:</h3>
          <h1 className="cart__total-price">
            {`${totalPrice}uah`}
          </h1>
        </div>

        <div className="cart__box">
          <MainButton
            type="button"
            text="Skip"
            isSecondary={true}
            onHandleClick={handleSkipClick}
          />

          <MainButton
            type="button"
            text="Create"
            onHandleClick={handleCreate}
          />
        </div>
      </div>
    </div>
  );
};
