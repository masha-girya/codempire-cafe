import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { useRequest, useUser } from 'utils/hooks';

export const useOrders = () => {
  const location = useLocation();
  const { sendUniqueRequest } = useRequest();
  const { checkUser } = useUser();

  const [ isUser, setIsUser ] = useState(true);
  const [ sortBy, setSortBy ] = useState('');

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
    handleSortChange,
  };
};
