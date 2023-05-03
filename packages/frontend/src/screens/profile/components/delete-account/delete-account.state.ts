import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'utils/hooks';
import { removeLocalItems } from 'utils/helpers';
import { deleteUser, validateToken } from 'utils/api';
import { useAppSelector } from 'store';
import {
  ROUTE_CONSTANTS as ROUTE,
  STORAGE_CONSTANTS as STORAGE,
} from 'constants-app';

export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);
  const { sendUniqueRequest } = useRequest();

  const handleSkip = useCallback(() => {
    navigate(-1);
  }, []);

  const handleDeleteAccount = async () => {
    await validateToken();

    await sendUniqueRequest(async () => {
      deleteUser(user.id);
    });

    removeLocalItems([
      STORAGE.ACCESS_TOKEN,
      STORAGE.CART_PRICE,
      STORAGE.CART_PRODUCTS,
    ]);

    navigate(ROUTE.PROFILE_LOGOUT);
  };

  return {
    handleSkip,
    handleDeleteAccount,
  };
};
