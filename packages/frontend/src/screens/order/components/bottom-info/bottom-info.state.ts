import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROLE, STATUS } from 'types';
import {
  ROUTE_CONSTANTS as ROUTE,
  STORAGE_CONSTANTS as STORAGE,
} from 'constants-app';
import { setLocalItem } from 'utils/helpers';
import { useNavigateBack, useOrdersRequest } from 'utils/hooks';
import { useAppSelector } from 'store';

interface IProps {
  mark: number | null,
  paymentHash: string | null,
  status: STATUS,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

export const useBottomInfo = (props: IProps) => {
  const { mark, status, paymentHash, setSuccess } = props;
  const { role } = useAppSelector(state => state.user);
  const { link } = useNavigateBack();
  const { number } = useParams();
  const navigate = useNavigate();
  const [ rate, setRate ] = useState(mark || 0);
  const [ hover, setHover ] = useState(0);
  const [ isError, setIsError ] = useState(false);
  const { updateOrder, isLoading } = useOrdersRequest({});

  const handleRate = (num: number) => {
    setRate(num);
  };

  const handleHoverOn = (num: number) => {
    setHover(num);
  };

  const handleHoverOut = useCallback(() => {
    setHover(rate);
  }, [rate]);

  const handleCreate = useCallback(async() => {
    if(rate !== mark && number) {
      const success = await updateOrder(number, { mark: rate });

      if(success) {
        setSuccess(true);
      } else {
        setIsError(true);
      }
    }
  }, [rate]);

  const buttonText = useMemo(() => {
    if(role === ROLE.user && status === STATUS.delivered) {
      return 'set mark';
    } else if(role === ROLE.user && !paymentHash) {
      return 'pay';
    }

    return 'close';
  }, [status]);

  const handleClick = () => {
    switch(buttonText) {
      case 'set mark':
        return handleCreate();

      case 'pay':
        if(number) {
          setLocalItem(STORAGE.ORDER_NUMBER, number);
        }
        return navigate(`${link}/${ROUTE.PAYMENT}`);
      
      default:
      case 'close':
        return navigate(link);
    }
  };

  const rateArray = useMemo(() => {
    return Array(5).fill(0);
  }, []);

  return {
    rate,
    role,
    hover,
    isError,
    rateArray,
    buttonText,
    isLoading,
    handleClick,
    handleRate,
    handleHoverOn,
    handleHoverOut,
  };
};