import React from 'react';
import { STATUS } from 'types';
import { OrderAccepting } from '../../components';
import './bottom-manager.scss';

interface IProps {
  orderStatus: STATUS,
  orderMark: number | null,
  handleReload: () => void,
}

export const BottomManager = (props: IProps) => {
  const { orderStatus, orderMark , handleReload} = props;
  const isCreated = orderStatus === STATUS.created;
  const isDelivered = orderStatus === STATUS.delivered;

  return (
    <div className={isCreated
      ? 'bottom-manager'
      : 'bottom-manager bottom-manager--delivered'}
    >
      {isDelivered
        ? (
          <>
            <h3>Order closed!</h3>
            <h4>{`mark: ${orderMark}`}</h4>
          </>)
        : (
          <OrderAccepting isCreated={isCreated} handleReload={handleReload} />
        )
      }
    </div>
  );
};
