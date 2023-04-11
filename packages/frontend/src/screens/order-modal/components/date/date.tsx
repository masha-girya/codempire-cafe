import React, { ChangeEvent } from 'react';
import { Dayjs } from 'dayjs';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { OrderDatePicker, OrderTimePicker } from '../../components';
import './date.scss';

interface IProps {
  date: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void,
  deliveryDate: Dayjs,
  deliveryTime: Dayjs,
  setDeliveryDate: (value: React.SetStateAction<Dayjs>) => void,
  setDeliveryTime: (value: React.SetStateAction<Dayjs>) => void,
}

export const OrderDate = (props: IProps) => {
  const {
    date,
    handleChange,
    deliveryDate,
    deliveryTime,
    setDeliveryDate,
    setDeliveryTime,
  } = props;

  return (
    <div className="date">
      <FormControl>
        <FormLabel id="date">
          Choose date and time of delivery
        </FormLabel>

        <RadioGroup
          aria-labelledby="date"
          name="date"
          id="date"
          value={date}
          onChange={handleChange}
        >
          <FormControlLabel
            value="now"
            control={<Radio />}
            label="Right now"
          />

          <FormControlLabel
            value="later"
            control={<Radio />}
            label="Choose date and time of delivery"
          />
        </RadioGroup>

        {date === 'later' && (
          <div className="date__choose-date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <OrderDatePicker
                deliveryDate={deliveryDate}
                setDeliveryDate={setDeliveryDate}
              />

              <OrderTimePicker
                deliveryTime={deliveryTime}
                setDeliveryTime={setDeliveryTime}
              />
            </LocalizationProvider>
          </div>
        )}
      </FormControl>
    </div>
  );
};
