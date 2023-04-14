import React from 'react';
import { Dayjs } from 'dayjs';
import { DeliveryInfo } from 'components/delivery-info';
import { useAppSelector } from 'store';
import { TIME_CONSTANTS as TIME } from 'constants-app';
import './order-info.scss';

interface IProps {
  currentAddress: string,
  date: Dayjs,
  time: Dayjs,
  comment: string,
  isLoading: boolean,
  isError: boolean,
}

export const OrderInfo = (props: IProps) => {
  const { name, phone, surname } = useAppSelector(state => state.user);
  const {
    currentAddress,
    date,
    time,
    comment,
    isLoading,
    isError,
  } = props;

  return (
    <div className="order-info">
      {isError && (
        <p className="order-info__loading">
          Something went wrong. Go to the main page and try again
        </p>)
      }

      {(isLoading && !isError) && <p className="order-info__loading">Loading...</p>}

      {(!isLoading && !isError) && (
        <DeliveryInfo
          name={`${name} ${surname}`}
          phone={phone}
          address={currentAddress}
          date={date.format(TIME.DATE)}
          time={time.format(TIME.TIME)}
          comment={comment}
        />)
      }
    </div>
  );
};
