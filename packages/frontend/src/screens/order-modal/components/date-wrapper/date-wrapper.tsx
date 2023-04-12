import React from 'react';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { OrderDatePicker, OrderTimePicker } from '../../components';
import './date-wrapper.scss';

interface IProps {
  deliveryDate: Dayjs,
  deliveryTime: Dayjs,
  error: string | null,
  setDeliveryDate: (value: React.SetStateAction<Dayjs>) => void,
  setDeliveryTime: (value: React.SetStateAction<Dayjs>) => void,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
}

export const DateWrapper = (props: IProps) => {
  const {
    setError,
    deliveryDate,
    deliveryTime,
    setDeliveryDate,
    setDeliveryTime,
    error,
  } = props;

  return (
    <div className="date-wrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <OrderDatePicker
          setError={setError}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
        />

        <OrderTimePicker
          error={error}
          setError={setError}
          deliveryTime={deliveryTime}
          setDeliveryTime={setDeliveryTime}
        />
      </LocalizationProvider>
    </div>
  );
};
