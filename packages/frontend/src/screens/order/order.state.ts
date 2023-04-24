import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useOrdersRequest, useReload } from 'utils/hooks';
import { useAppSelector } from 'store';
import { ROLE, STATUS } from 'types';

export const useOrder = () => {
  const navigate = useNavigate();
  const { role } = useAppSelector(state=> state.user);
  const { number } = useParams();
  const { pathname } = useLocation();
  const { loadOrder, order, isLoading, updateOrder } = useOrdersRequest({});
  const { isReload, handleReload } = useReload();

  const isManager = role === ROLE.manager;

  const handleClose = useCallback(() => {
    const index = pathname.lastIndexOf('/');
    const link = pathname.slice(0, index);
    navigate(link);
  }, [pathname]);

  useEffect(() => {
    loadOrder(number);
  }, [isReload]);

  useEffect(() => {
    if(role === ROLE.manager && order?.status === STATUS.created) {
      updateOrder(number, { watchedManager: 'watched' });
    }

    if(role === ROLE.user && order?.status === STATUS.ready) {
      updateOrder(number, { watchedUser: 'watched' });
    }
  }, [order]);

  return { order, isLoading, isManager, handleClose, handleReload };
};
