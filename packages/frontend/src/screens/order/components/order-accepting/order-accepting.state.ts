import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { STATUS } from 'types';
import { changeOrder } from 'utils/api';
import { useRequest } from 'utils/hooks';

interface IProps {
  handleReload: () => void,
}

export const useOrderAccepting = ({ handleReload }: IProps) => {
  const { number } = useParams();
  const { sendUniqueRequest, isError, isLoading } = useRequest();

  const handleAccept = useCallback(async() => {
    const data = { status: STATUS.onWay };
    let request;

    if(number) {
      request = await sendUniqueRequest(() => changeOrder(number, data));
    }

    if(request) {
      handleReload();
    }
  }, [isLoading]);

  const handleClose = useCallback(async() => {
    const data = { status: STATUS.delivered };
    let request;

    if(number) {
      request = await sendUniqueRequest(() => changeOrder(number, data));
    }

    if(request) {
      handleReload();
    }
  }, [isLoading]);

  return { handleAccept, handleClose, isError, isLoading };
};
