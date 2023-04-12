import React, { memo, useCallback, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerIcon } from '../../components';
import './date-picker.scss';

interface IProps {
  deliveryDate: Dayjs,
  setDeliveryDate: (value: React.SetStateAction<Dayjs>) => void,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
}

export const OrderDatePicker = memo((props: IProps) => {
  const {
    deliveryDate,
    setDeliveryDate,
    setError,
  } = props;

  const handleDeliveryDateChange = useCallback((newDate: Dayjs | null) => {
    if(newDate) {
      setDeliveryDate(newDate);
    } else {
      setDeliveryDate(dayjs());
    }
  }, [deliveryDate]);

  return (
    <DatePicker
      className="date-picker"
      value={deliveryDate}
      onChange={handleDeliveryDateChange}
      format="DD/MM/YYYY"
      slots={{
        openPickerIcon: DatePickerIcon,
      }}
      disablePast
      minDate={dayjs()}
      onError={(newError) => setError(newError)}
    />
  );
});

OrderDatePicker.displayName = 'OrderDatePicker';
