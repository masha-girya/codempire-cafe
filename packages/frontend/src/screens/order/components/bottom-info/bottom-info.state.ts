import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ROLE, STATUS } from 'types';
import { useRequest } from 'utils/hooks';
import { changeOrder } from 'utils/api';
import { useAppSelector } from 'store';

interface IProps {
  mark: number | null,
  status: STATUS,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

export const useBottomInfo = (props: IProps) => {
  const { mark, status, setSuccess } = props;
  const { role } = useAppSelector(state => state.user);
  const { number } = useParams();
  const [ rate, setRate ] = useState(mark || 0);
  const [ hover, setHover ] = useState(0);
  const [ isError, setIsError ] = useState(false);
  const { sendUniqueRequest, isLoading } = useRequest();

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
      const success = await sendUniqueRequest(() => (
        changeOrder(number, { mark: rate })
      ));

      if(success) {
        setSuccess(true);
      } else {
        setIsError(true);
      }
    }
  }, [rate]);

  const buttonText = useMemo(() => {
    if(role === ROLE.user && status === STATUS.delivered) {
      return 'create';
    }

    return 'close';
  }, [status]);

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
    handleCreate,
    handleRate,
    handleHoverOn,
    handleHoverOut,
  };
};