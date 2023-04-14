import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IOrderInfo } from 'types';
import { useRequest } from 'utils/hooks';
import { getOrderByNumber } from 'utils/api';

export const useOrder = () => {
  const navigate = useNavigate();
  const { number } = useParams();
  const { pathname } = useLocation();
  const { sendUniqueRequest, isLoading } = useRequest();
  const [ order, setOrder ] = useState<IOrderInfo | null>(null);

  const loadOrder = useCallback(async() => {
    const response: IOrderInfo = await sendUniqueRequest(() => (
      getOrderByNumber(number || '')
    ));

    if(response) {
      setOrder(response);
    }
  }, []);

  const handleClose = useCallback(() => {
    const index = pathname.lastIndexOf('/');
    const link = pathname.slice(0, index);
    navigate(link);
  }, [pathname]);

  useEffect(() => {
    loadOrder();
  }, []);


  return { order, isLoading, handleClose };
};