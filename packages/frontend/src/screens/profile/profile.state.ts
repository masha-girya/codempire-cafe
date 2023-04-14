import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest, useUser } from 'utils/hooks';
import { removeLocalItems } from 'utils/helpers';
import { deleteUser, validateToken } from 'utils/api';
import { useAppSelector, useAppDispatch } from 'store';
import { cartActions } from 'store/features';
import {
  ROUTE_CONSTANTS as ROUTE,
  STORAGE_CONSTANTS as STORAGE,
} from 'constants-app';

export const useProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id, name, phone, role, avatar, surname } = useAppSelector(
    (state) => state.user
  );
  const [isUser, setIsUser] = useState(true);
  const { sendUniqueRequest } = useRequest();
  const { checkUser, removeUser } = useUser();

  const loadUser = useCallback(async () => {
    const user = await sendUniqueRequest(checkUser);

    if (!user) {
      setIsUser(false);
    }
  }, [isUser]);

  useEffect(() => {
    loadUser();
  }, [isUser]);

  const handleModalOpen = useCallback(() => {
    navigate(ROUTE.PROFILE_EDIT_USER);
  }, []);

  const handleLogOut = useCallback(() => {
    removeLocalItems([
      STORAGE.ACCESS_TOKEN,
      STORAGE.CART_PRICE,
      STORAGE.CART_PRODUCTS,
    ]);
    dispatch(cartActions.clearCart());

    navigate(ROUTE.PROFILE_LOGOUT);
    removeUser();
  }, []);

  const handleDeleteAccount = async () => {
    await validateToken();

    await sendUniqueRequest(async () => {
      deleteUser(id);
    });

    removeLocalItems([
      STORAGE.ACCESS_TOKEN,
      STORAGE.CART_PRICE,
      STORAGE.CART_PRODUCTS,
    ]);

    navigate(ROUTE.PROFILE_LOGOUT);
  };

  const handleOpenAddress = useCallback(() => {
    navigate(ROUTE.PROFILE_CHANGE_ADDRESS);
  }, []);

  return {
    name,
    phone,
    role,
    avatar,
    surname,
    isUser,
    handleOpenAddress,
    handleDeleteAccount,
    handleLogOut,
    handleModalOpen,
  };
};
