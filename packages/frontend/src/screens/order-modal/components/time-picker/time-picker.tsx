import React, { memo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { Icon } from 'components/icon';
import { useTimePicker } from './time-picker.state';
import './time-picker.scss';

interface IProps {
  deliveryTime: Dayjs,
  setDeliveryTime: (value: React.SetStateAction<Dayjs>) => void,
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
}

export const OrderTimePicker = memo((props: IProps) => {
  const {
    deliveryTime,
    setDeliveryTime,
    error,
    setError,
  } = props;

  const {
    errorMessage,
    handleIncrease,
    handleDecrease,
    handleDeliveryTimeChange,
  } = useTimePicker({ setDeliveryTime, deliveryTime, error });

  return (
    <div className="time-picker">
      <button
        type="button"
        className="time-picker__decrease"
        onClick={handleDecrease}
        disabled={deliveryTime < dayjs()}
      >
        <Icon type="rightArrow" />
      </button>

      <DesktopTimePicker
        className="time-picker__picker"
        value={deliveryTime}
        onChange={handleDeliveryTimeChange}
        format="HH:mm"
        minTime={dayjs().subtract(1, 'hour')}
        onError={(newError) => setError(newError)}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
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
