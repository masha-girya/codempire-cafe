import React from 'react';
import { PaymentInfo, Transaction } from './components';
import { usePayment } from './payment.state';

interface IProps {
  orderNumber?: string,
}

export const Payment = (props: IProps) => {
  const { orderNumber } = props;

  const {
    order,
    error,
    handlePaymentOpen,
    handleSkip,
    isPaymentActive,
  } = usePayment({ orderNumber });

  return (
    <div className="payment">
      {order && !isPaymentActive
        ? (
          <PaymentInfo
            order={order}
            handlePaymentOpen={handlePaymentOpen}
            handleSkip={handleSkip}
          />)
        : <p>{error}</p>
      }

      {order && isPaymentActive
        ? <Transaction order={order} handleSkip={handleSkip} />
        : <p>{error}</p>
      }
    </div>
  );
};
