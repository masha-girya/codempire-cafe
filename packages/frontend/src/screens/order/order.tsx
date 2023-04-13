import React from 'react';
import dayjs from 'dayjs';
import { BottomInfo } from './components';
import { DeliveryInfo } from 'components/delivery-info';
import { useOrder } from './order.state';
import './order.scss';

interface IProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Order = ({ setSuccess }: IProps) => {
  const {
    order,
    isLoading,
    handleClose,
  } = useOrder();

  return (
    <div className="order">
      {(isLoading) && <p className="order__loading">Loading...</p>}

      {(!isLoading && order) && (
        <>
          <DeliveryInfo
            name={`${order.name} ${order.surname}`}
            phone={order.phone}
            address={order.address}
            date={dayjs(order.date).format('DD/MM/YY')}
          />

          <BottomInfo
            setSuccess={setSuccess}
            handleClose={handleClose}
            status={order.status}
            date={order.date}
            mark={order.mark}
          />
        </>)
      }
    </div>
  );
};


