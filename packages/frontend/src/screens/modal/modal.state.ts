import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  pathname: string,
}

export const useModal = ({ pathname }: IProps) => {
  const navigate = useNavigate();
  const [ isEditOnSuccess, setIsEditOnSuccess ] = useState(false);

  const isUser = pathname.includes('user');
  const isPass = pathname.includes('pass');
  const isAddress = pathname.includes('address');
  const isOrder = pathname.includes('order');
  const isCart = pathname.includes('cart') && !isOrder;

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
    setIsEditOnSuccess,
    handleModalClose,
    handleClose,
  };
};
