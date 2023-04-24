import { useState, useCallback } from 'react';
import { Params, useNavigate } from 'react-router-dom';
import { PATHNAME_CONSTANTS as PATHNAME } from 'constants-app';

interface IProps {
  pathname: string,
  params: Readonly<Params<string>>,
}

export const useModal = ({ pathname, params }: IProps) => {
  const navigate = useNavigate();
  const [ isEditOnSuccess, setIsEditOnSuccess ] = useState(false);

  const isUser = pathname.includes(PATHNAME.USER);
  const isPass = pathname.includes(PATHNAME.PASSWORD);
  const isAddress = pathname.includes(PATHNAME.ADDRESS);
  const isOrder = pathname.includes(PATHNAME.ORDER);
  const isCart = pathname.includes(PATHNAME.CART);
  const isNotifications = pathname.includes(PATHNAME.NOTIFICATIONS);
  const isOrderNumber = params.number;

  const navigateBack = () => {
    const index = pathname.lastIndexOf('/');
    const link = pathname.slice(0, index);
    navigate(link);
  };

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(event.target === event.currentTarget) {
      navigateBack();
      setIsEditOnSuccess(false);
    }
  };

  const handleClose = useCallback(() => {
    navigateBack();
  }, [pathname]);

  return {
    isUser,
    isPass,
    isAddress,
    isCart,
    isOrder,
    isEditOnSuccess,
    isOrderNumber,
    isNotifications,
    setIsEditOnSuccess,
    handleModalClose,
    handleClose,
  };
};
