import { Dayjs } from 'dayjs';
import React from 'react';
import { useAppSelector } from 'store';
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
  const { name, phone } = useAppSelector(state => state.user);
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
        <>
          <div className="order-info__user">
            <h1 className="order-info__title">User information</h1>

            <div>
              <h4 className="order-info__subtitle">Name</h4>
              <p className="order-info__info">{name}</p>
            </div>

            <div>
              <h4 className="order-info__subtitle">Phone</h4>
              <p className="order-info__info">{phone}</p>
            </div>

            <div>
              <h4 className="order-info__subtitle">Address</h4>
              <p className="order-info__info">{currentAddress}</p>
            </div>
          </div>

          <hr className="order-info__line"/>

          <div className="order-info__delivery">
            <h1 className="order-info__title">Delivery information</h1>

            <div>
              <h4 className="order-info__subtitle">Date</h4>
              <p className="order-info__info">{date.format('DD/MM/YY')}</p>
            </div>

            <div>
              <h4 className="order-info__subtitle">Time</h4>
              <p className="order-info__info">{time.format('HH:mm')}</p>
            </div>

            <div>
              <h4 className="order-info__subtitle">Comment</h4>
              <p className="order-info__info">{comment}</p>
            </div>
          </div>
        </>)
      }
    </div>
  );
};
