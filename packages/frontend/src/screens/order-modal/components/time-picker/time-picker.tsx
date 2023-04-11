import React, { memo } from 'react';
import { Dayjs } from 'dayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { Icon } from 'components/icon';
import { useTimePicker } from './time-picker.state';
import './time-picker.scss';

interface IProps {
  deliveryTime: Dayjs,
  setDeliveryTime: (value: React.SetStateAction<Dayjs>) => void,
}

export const OrderTimePicker = memo((props: IProps) => {
  const {
    deliveryTime,
    setDeliveryTime,
  } = props;
  const {
    handleIncrease,
    handleDecrease,
    handleDeliveryTimeChange,
  } = useTimePicker({ setDeliveryTime, deliveryTime });

  return (
    <div className="time-picker">
      <button
        type="button"
        className="time-picker__decrease"
        onClick={handleDecrease}
      >
        <Icon type="rightArrow" />
      </button>

      <DesktopTimePicker
        className="time-picker__picker"
        value={deliveryTime}
        onChange={handleDeliveryTimeChange}
        format="HH:mm"
      />

      <button
        type="button"
        className="time-picker__increase"
        onClick={handleIncrease}
      >
        <Icon type="rightArrow" />
      </button>
    </div>
  );
});

OrderTimePicker.displayName = 'OrderTimePicker';
