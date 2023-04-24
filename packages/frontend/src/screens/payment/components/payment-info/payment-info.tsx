import React from 'react';
import { MainButton } from 'components/button';
import { IOrder } from 'types';
import './payment-info.scss';

interface IProps {
  order: IOrder;
  handlePaymentOpen: () => void;
  handleSkip: () => void;
}

export const PaymentInfo = (props: IProps) => {
  const { order, handleSkip, handlePaymentOpen } = props;
  const { number, totalPrice } = order;

  return (
    <div className="payment-info">
      <div>
        <h4 className="payment-info__subtitle">Order number:</h4>
        <p className="payment-info__info">{number}</p>
      </div>

      <div>
        <h4 className="payment-info__subtitle">Total price:</h4>
        <p className="payment-info__info">{totalPrice}</p>
      </div>

      <div className="payment-info__actions">
        <MainButton
          type="button"
          text="Pay later"
          isSecondary={true}
          onHandleClick={handleSkip}
        />

        <MainButton
          type="button"
          text="Pay"
          onHandleClick={handlePaymentOpen}
        />
      </div>
    </div>
  );
};
