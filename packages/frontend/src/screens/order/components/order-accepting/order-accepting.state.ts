import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { IOrder, STATUS } from 'types';
import { useOrdersRequest } from 'utils/hooks';

interface IProps {
  handleReload: () => void,
}

export const useOrderAccepting = ({ handleReload }: IProps) => {
  const { number } = useParams();
  const { updateOrder, isError, isLoading } = useOrdersRequest({});

  const handleAccept = useCallback(async() => {
    const data: Partial<IOrder> = { status: STATUS.ready, watchedUser: 'unwatched' };
    let request;

    if(number) {
      request = await updateOrder(number, data);
    }

    if(request) {
      handleReload();
    }
  }, [isLoading]);

  const handleClose = useCallback(async() => {
    const data = { status: STATUS.delivered };
    let request;

    if(number) {
      request = await updateOrder(number, data);
    }

    if(request) {
      handleReload();
    }
  }, [isLoading]);

  return { handleAccept, handleClose, isError, isLoading };
};
