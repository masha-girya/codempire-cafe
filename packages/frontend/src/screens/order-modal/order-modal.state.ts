import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';

export const useOrderModal = () => {
  const navigate = useNavigate();

  const [ isOrderOnSuccess, setIsOrderOnSuccess ] = useState(false);

  const handleClick = () => {
    navigate(ROUTE.MAIN_PAGE_DISH);
  };

  useEffect(() => {
    return setIsOrderOnSuccess(false);
  }, []);

  return {
    isOrderOnSuccess,
    setIsOrderOnSuccess,
    handleClick,
  };
};
