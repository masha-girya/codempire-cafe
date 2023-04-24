import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { BottomInfo, BottomManager } from './components';
import { DeliveryInfo } from 'components/delivery-info';
import { TIME_CONSTANTS as TIME } from 'constants-app';
import { useOrder } from './order.state';
import './order.scss';

interface IProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Order = ({ setSuccess }: IProps) => {
  dayjs.extend(utc);

  const {
    order,
    isLoading,
    isManager,
    handleReload,
  } = useOrder();

  return (
    <div className="order">
      {(isLoading && !order) && <p className="order__loading">Loading...</p>}

      {(!isLoading && order) && (
        <>
          <DeliveryInfo
            name={`${order.name} ${order.surname}`}
            phone={order.phone}
            address={order.address}
            date={dayjs(order.date).utc().format(TIME.DATE)}
            paymentStatus={order.paymentHash}
          />

          {isManager
            ? (
              <BottomManager
                orderStatus={order.status}
                orderMark={order.mark}
                handleReload={handleReload}
              />)
            : (
              <BottomInfo
                setSuccess={setSuccess}
                order={order}
                date={dayjs(order.date).utc().format(TIME.TIME)}
              />
            )
          }
        </>)
      }
    </div>
  );
};


