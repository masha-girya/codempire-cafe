import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Icon } from 'components/icon';
import { IOrder } from 'types';
import { TIME_CONSTANTS as TIME } from 'constants-app';
import { cutText } from 'utils/helpers';
import './orders-field.scss';

interface IProps {
  order: IOrder,
}

export const OrdersField = ({ order }: IProps) => {
  dayjs.extend(utc);

  const { date, number, dishId, menuId } = order;

  const orderItems = [...dishId, ...menuId].join(', ');

  return (
    <li className="field">
      <Link to={`${number}`} className="field__link">
        <div className="right">
          <h5 className="field__right--number">
            {number}
          </h5>

          <p className="field__right--time">
            {`time: ${dayjs(date).utc().format(TIME.TIME)}`}
          </p>
        </div>

        <p className="field__center">
          {cutText(orderItems)}
        </p>

        <Icon type="rightArrow" />
      </Link>
    </li>
  );
};
