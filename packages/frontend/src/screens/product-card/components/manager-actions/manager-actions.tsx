import React from 'react';
import { Link } from 'react-router-dom';
import { MainButton } from 'components/button';
import { useManagerActions } from './manager-actions.state';
import { DeleteProduct } from '../../components';
import './manager-actions.scss';

interface IProps {
  id: string,
  isMenu: boolean,
  handleReload: () => void,
}

export const ManagerActions = (props: IProps) => {
  const {
    id,
    isMenu,
    handleReload,
   } = props;

  const {
    isError,
    linkToEdit,
    isDeleteOnConfirm,
    handleDelete,
    handleConfirmDelete,
  } = useManagerActions({ id, isMenu, handleReload });

  return (
    <div className="manager-actions">
      {isDeleteOnConfirm && (
        <DeleteProduct
          isError={isError}
          handleDelete={handleDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}

      <Link to={`${linkToEdit}/${id}`} >
        <MainButton
          type="button"
          text="edit"
          isMiddleSize={true}
        />
      </Link>

      <MainButton
        type="button"
        text="delete"
        isMiddleSize={true}
        isDanger={true}
        onHandleClick={handleConfirmDelete}
      />
    </div>
  );
};
