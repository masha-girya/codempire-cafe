import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigateBack, useOrdersRequest } from 'utils/hooks';
import { STORAGE_CONSTANTS as STORAGE } from 'constants-app';
import { getLocalItem } from 'utils/helpers';

interface IProps {
  orderNumber?: string,
}

export const usePayment = (props: IProps) => {
  const { orderNumber } = props;
  const navigate = useNavigate();
  const { link } = useNavigateBack();
  const { loadOrder: getOrder, order } = useOrdersRequest({});

  const [ error, setError ] = useState('');
  const [ isPaymentActive, setIsPaymentActive ] = useState(false);
  const number = orderNumber || getLocalItem(STORAGE.ORDER_NUMBER);

  const handlePaymentOpen = useCallback(() => {
    setIsPaymentActive(true);
  }, []);

  const handleSkip = useCallback(() => {
    navigate(link);
  }, []);

  const loadOrder = useCallback(async() => {
    if(number) {
      await getOrder(number);
    } else {
      setError('Can not find order`s number');
    }
  }, [number]);

  useEffect(() => {
    loadOrder();
  }, []);

  return {
    order,
    error,
    handlePaymentOpen,
    handleSkip,
    isPaymentActive,
  };
};
