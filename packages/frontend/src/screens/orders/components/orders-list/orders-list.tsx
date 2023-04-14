import React from 'react';
import dayjs from 'dayjs';
import { OrdersField } from '../../components';
import { IOrder } from 'types';
import { TIME_CONSTANTS as TIME } from 'constants-app';
import { getFormattedDate } from 'utils/helpers';
import './orders-list.scss';

interface IProps {
  orders: IOrder[],
  orderDate: string,
}

export const OrdersList = (props: IProps) => {
  const { orders, orderDate } = props;

  const ordersToMap = orders.filter(order => (
    dayjs(order.date).format(TIME.DATE) === orderDate
  ));

  return (
    <div className="lists">
      <ul className="lists__list">
        <li className="lists__field lists__field--title">
          {getFormattedDate(orderDate)}
        </li>
        {ordersToMap.map(order => (
          <OrdersField order={order} key={order.id} />)
        )}
      </ul>
    </div>
  );
};
