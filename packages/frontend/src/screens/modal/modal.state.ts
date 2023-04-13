import { useState, useCallback } from 'react';
import { Params, useNavigate } from 'react-router-dom';

interface IProps {
  pathname: string,
  params: Readonly<Params<string>>,
}

export const useModal = ({ pathname, params }: IProps) => {
  const navigate = useNavigate();
  const [ isEditOnSuccess, setIsEditOnSuccess ] = useState(false);

  const isUser = pathname.includes('user');
  const isPass = pathname.includes('pass');
  const isAddress = pathname.includes('address');
  const isOrder = pathname.includes('order-creation');
  const isCart = pathname.includes('cart');
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
    setIsEditOnSuccess,
    handleModalClose,
    handleClose,
  };
};
