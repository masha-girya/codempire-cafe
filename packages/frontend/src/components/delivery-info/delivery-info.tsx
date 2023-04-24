import React from 'react';
import './delivery-info.scss';

interface IProps {
  name: string,
  phone: string,
  address: string,
  date: string,
  time?: string,
  comment?: string,
  paymentStatus?: string | null,
}

export const DeliveryInfo = (props: IProps) => {
  const {
    name,
    phone,
    address,
    date,
    comment,
    time,
    paymentStatus,
  } = props;

  return (
    <div className="delivery-info">
      <div>
        <h1 className="delivery-info__title">User information</h1>

        <div>
          <h4 className="delivery-info__subtitle">Name</h4>
          <p className="delivery-info__info">{name}</p>
        </div>

        <div>
          <h4 className="delivery-info__subtitle">Phone</h4>
          <p className="delivery-info__info">{phone}</p>
        </div>

        <div>
          <h4 className="delivery-info__subtitle">Address</h4>
          <p className="delivery-info__info">{address}</p>
        </div>
      </div>

      <hr className="delivery-info__line"/>

      <div className="delivery-info__delivery">
        <h1 className="delivery-info__title">Delivery information</h1>

        <div>
          <h4 className="delivery-info__subtitle">Date</h4>
          <p className="delivery-info__info">{date}</p>
        </div>

        <div>
          <h4 className="delivery-info__subtitle">Payment hash</h4>
          <p className="delivery-info__info">{paymentStatus || 'Not payed yed'}</p>
        </div>

        {time && (
          <div>
            <h4 className="delivery-info__subtitle">Time</h4>
            <p className="delivery-info__info">{time}</p>
          </div>
        )}

        {comment && (
          <div>
            <h4 className="delivery-info__subtitle">Comment</h4>
            <p className="delivery-info__info">{comment}</p>
        </div>
        )}
      </div>
    </div>
  );
};
