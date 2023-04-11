import React from 'react';
import { MainButton } from 'components/button';
import { OrderCreation } from './components';
import { useOrderModal } from './order-modal.state';
import './order-modal.scss';

export const OrderModal = () => {
  const {
    isOrderOnSuccess,
    setIsOrderOnSuccess,
    handleClick,
  } = useOrderModal();

  return (
    <div className="order-modal">
      {isOrderOnSuccess
        ? (
          <div className="order-modal__box">
            <h1 className="order-modal__text">
              Thank you for an order!
            </h1>
            <MainButton
              text="To main page"
              type="button"
              onHandleClick={handleClick}
            />
          </div>
          )
        : <OrderCreation setIsOrderOnSuccess={setIsOrderOnSuccess} />
      }
    </div>
  );
};
