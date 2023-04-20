import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { STATUS } from 'types';
import { changeOrder } from 'utils/api';
import { useRequest } from 'utils/hooks';

export const useOrderAccepting = () => {
  const { number } = useParams();
  const { sendUniqueRequest, isError, isLoading } = useRequest();

  const handleAccept = useCallback(async() => {
    const data = { status: STATUS.onWay };
    let response;

    if(number) {
      response = await sendUniqueRequest(() => changeOrder(number, data));
    }

    if(response) {
      window.location.reload();
    }
  }, []);

  const handleClose = useCallback(async() => {
    const data = { status: STATUS.delivered };

    if(number) {
      await sendUniqueRequest(() => changeOrder(number, data));
    }
  }, []);

  return { handleAccept, handleClose, isError, isLoading };
};
