import React from 'react';
import { Link } from 'react-router-dom';
import { MainButton } from 'components/button';
import { useManagerActions } from './manager-actions.state';
import { DeleteProduct } from './components';
import './manager-actions.scss';

interface IProps {
  id: string,
  isMenu: boolean,
  handleReload: () => void,
  isProductCard?: boolean,
}

export const ManagerActions = (props: IProps) => {
  const {
    id,
    isMenu,
    handleReload,
    isProductCard,
   } = props;

  const {
    isError,
    linkToEdit,
    isDeleteOnConfirm,
    handleDelete,
    handleConfirmDelete,
  } = useManagerActions({ id, isMenu, handleReload });

  return (
    <div className={isProductCard ? 'manager-actions' : ''}>
      {isDeleteOnConfirm && (
        <DeleteProduct
          isProductCard={isProductCard}
          isError={isError}
          handleDelete={handleDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}

      <Link to={`${linkToEdit}/${id}`} >
        <MainButton
          type="button"
          text="edit"
          isMiddleSize={isProductCard}
        />
      </Link>

      <MainButton
        type="button"
        text="delete"
        isMiddleSize={isProductCard}
        isDanger={true}
        onHandleClick={handleConfirmDelete}
        isDisabled={isDeleteOnConfirm}
      />
    </div>
  );
};
