import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { cartActions } from 'store/features';
import { useRequest } from 'utils/hooks';
import { createOrder } from 'utils/api';
import { removeLocalItems } from 'utils/helpers';
import {
  STORAGE_CONSTANTS as STORAGE,
  TIME_CONSTANTS as TIME,
} from 'constants-app';

interface IProps {
  setIsOrderOnSuccess: (value: React.SetStateAction<boolean>) => void,
}

export const useOrderCreation = ({ setIsOrderOnSuccess }: IProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sendUniqueRequest, isLoading, isError } = useRequest();

  const { address, id } = useAppSelector(state => state.user);
  const { products } = useAppSelector(state => state.cart);

  const [ deliveryDate, setDeliveryDate ] = useState(dayjs());
  const [ deliveryTime, setDeliveryTime ] = useState(dayjs());
  const [ isOrderOnConfirm, setIsOrderOnConfirm ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ addressError, setAddressError ] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      date: 'now',
      comment: '',
      currentAddress: address[0],
    },
    onSubmit: async (values) => {
      const { currentAddress, comment } = values;

      const dishId: string[] = [];
      const menuId: string[] = [];

      products.forEach(item => {
        for(let i = 0; i < item.amount; i++) {
          if('dishesId' in item.product) {
            menuId.push(item.product.id);

            continue;
          }

          dishId.push(item.product.id);
        }
      });

      const dateString = deliveryDate.utc().tz(TIME.TIMEZONE).format(TIME.DATE_DB);
      const timeString = deliveryTime.utc().tz(TIME.TIMEZONE).format(TIME.TIME_DB);
      const fullDate = `${dateString}T${timeString}Z`;
      const date = new Date(fullDate);

      const response = await sendUniqueRequest(() => (
        createOrder({
          userId: id,
          address: currentAddress,
          dishId,
          menuId,
          comment,
          date,
        })
      ));

      if(response) {
        setIsOrderOnSuccess(true);
        removeLocalItems([
          STORAGE.CART_PRODUCTS,
          STORAGE.CART_PRICE,
        ]);
        dispatch(cartActions.clearCart());
      }
    },
  });

  const handleSkip = useCallback(() => {
    navigate(-1);
  }, []);

  const handleConfirmOrder = useCallback(() => {
    setIsOrderOnConfirm(true);
  }, []);

  const isButtonDisabled = useMemo(() => {
    return formik.isSubmitting
      || (error ? true : false)
      || addressError.length > 0;
  }, [error, addressError, formik.isSubmitting]);

  useEffect(() => {
    if(address.length === 0) {
      setAddressError('Address is empty');
    } else {
      setAddressError('');
    }
  }, [address]);

  return {
    formik,
    isError,
    error,
    setError,
    addressError,
    isLoading,
    deliveryDate,
    deliveryTime,
    isButtonDisabled,
    isOrderOnConfirm,
    handleSkip,
    setDeliveryDate,
    setDeliveryTime,
    handleConfirmOrder,
  };
};
