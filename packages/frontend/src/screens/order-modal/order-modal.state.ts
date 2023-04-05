import { useCallback, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

export const useOrderModal = () => {
  const navigate = useNavigate();
  const { address } = useAppSelector(state => state.user);
  const [ deliveryDate, setDeliveryDate ] = useState(dayjs());
  const [ deliveryTime, setDeliveryTime ] = useState(dayjs());

    const formik = useFormik({
    initialValues: {
      date: 'now',
      comment: '',
      currentAddress: address[0],
    },
    onSubmit: async (values) => {
      console.log('submitting...');
    },
  });

  const handleDeliveryDateChange = useCallback((newDate: Dayjs | null) => {
    if(newDate) {
      setDeliveryDate(newDate);
    } else {
      setDeliveryDate(dayjs());
    }
  }, [deliveryDate]);

  const handleDeliveryTimeChange = useCallback((newTime: Dayjs | null) => {
    if(newTime) {
      setDeliveryTime(newTime);
    } else {
      setDeliveryTime(dayjs());
    }
  }, [deliveryTime]);

  const handleSkip = useCallback(() => {
    navigate(-1);
  }, []);

  return {
    formik,
    handleSkip,
    deliveryDate,
    deliveryTime,
    handleDeliveryDateChange,
    handleDeliveryTimeChange,
  };
};
