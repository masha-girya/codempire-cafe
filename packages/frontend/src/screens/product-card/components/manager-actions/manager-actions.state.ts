import { useCallback, useMemo, useState } from 'react';
import { useRequest } from 'utils/hooks';
import { deleteDish, deleteMenu } from 'utils/api';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';

interface IProps {
  id: string,
  isMenu: boolean,
  handleReload: () => void,
}

export const useManagerActions = (props: IProps) => {
  const { id, isMenu, handleReload } = props;
  const { sendUniqueRequest, isError, setIsError } = useRequest();
  const [ isDeleteOnConfirm, setIsDeleteOnConfirm ] = useState(false);

  const handleDelete = useCallback(async() => {
    let request;

    if(isMenu) {
      request = () => deleteMenu(id);
    } else {
      request = () => deleteDish(id);
    }

    const response = await sendUniqueRequest(request);

    if(response) {
      setIsDeleteOnConfirm(false);
      handleReload();
    }
  }, [isDeleteOnConfirm]);

  const handleConfirmDelete = useCallback(() => {
    setIsError(false);
    setIsDeleteOnConfirm(!isDeleteOnConfirm);
  }, [isDeleteOnConfirm]);

  const linkToEdit = useMemo(() => {
    if(isMenu) {
      return ROUTE.MENU_EDIT;
    }

    return ROUTE.DISH_EDIT;
  }, [id]);

  return {
    isError,
    linkToEdit,
    isDeleteOnConfirm,
    handleDelete,
    handleConfirmDelete,
  };
};
