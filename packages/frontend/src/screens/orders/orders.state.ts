import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { useRequest, useUser } from 'utils/hooks';
import { PATHNAME_CONSTANTS as PATHNAME } from 'constants-app';

export const useOrders = () => {
  const { pathname } = useLocation();
  const { sendUniqueRequest } = useRequest();
  const { checkUser } = useUser();

  const [ isUser, setIsUser ] = useState(true);
  const [ sortBy, setSortBy ] = useState('');

  const locationCompleted = pathname.includes(PATHNAME.ORDER_COMPLETED);
  const locationWaiting = pathname.includes(PATHNAME.ORDER_WAITING)
    || !locationCompleted;

  const loadUser = useCallback(async () => {
    const user = await sendUniqueRequest(checkUser);

    if (!user) {
      setIsUser(false);
    }
  }, [isUser]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    setSortBy('');
  }, [location]);

  useEffect(() => {
    loadUser();
  }, [isUser]);

  return {
    isUser,
    sortBy,
    locationWaiting,
    locationCompleted,
    handleSortChange,
  };
};
