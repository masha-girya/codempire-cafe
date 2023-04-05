import React, { memo } from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerIcon } from '../../components';
import './date-picker.scss';

interface IProps {
  deliveryDate: Dayjs,
  handleDeliveryDateChange: (newDate: Dayjs | null) => void,
}

export const OrderDatePicker = memo((props: IProps) => {
  const {
    deliveryDate,
    handleDeliveryDateChange,
  } = props;

  return (
    <DatePicker
      className="date-picker"
      value={deliveryDate}
      onChange={handleDeliveryDateChange}
      format="DD/MM/YYYY"
      slots={{
        openPickerIcon: DatePickerIcon,
      }}
    />
  );
});

OrderDatePicker.displayName = 'OrderDatePicker';
