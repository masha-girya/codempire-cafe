import React, { memo } from 'react';
import { Dayjs } from 'dayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import './time-picker.scss';

interface IProps {
  deliveryTime: Dayjs,
  handleDeliveryTimeChange: (newDate: Dayjs | null) => void,
}

export const OrderTimePicker = memo((props: IProps) => {
  const {
    deliveryTime,
    handleDeliveryTimeChange,
  } = props;

  return (
    <DesktopTimePicker
      className="time-picker"
      value={deliveryTime}
      onChange={handleDeliveryTimeChange}
      format="HH:mm"
      minutesStep={30}
    />
  );
});

OrderTimePicker.displayName = 'OrderTimePicker';
