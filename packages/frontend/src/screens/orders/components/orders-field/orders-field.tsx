import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Icon } from 'components/icon';
import { IOrder } from 'types';
import { TIME_CONSTANTS as TIME } from 'constants-app';
import { useOrdersField } from './orders-field.state';
import './orders-field.scss';

interface IProps {
  order: IOrder,
  isNotifications?: boolean,
}

export const OrdersField = ({ order, isNotifications }: IProps) => {
  dayjs.extend(utc);

  const { date, number} = order;
  const {
    link,
    orderItemsText,
    notificationText,
    isFreshNotification,
  } = useOrdersField({ order, isNotifications });

  return (
    <li className={isFreshNotification
      ? 'field field--fresh'
      : 'field'
    }>
      <Link to={link} className="field__link">
        <div>
          <h5 className="field__right--number">
            {isNotifications ? notificationText : number}
          </h5>

          <p className="field__right--time">
            {`time: ${dayjs(date).utc().format(TIME.TIME)}`}
          </p>
        </div>

        {!isNotifications && <p className="field__center">{orderItemsText}</p>}

        <Icon type="rightArrow" />
      </Link>
    </li>
  );
};
