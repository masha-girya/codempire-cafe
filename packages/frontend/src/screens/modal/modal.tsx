import React from 'react';
import { useLocation } from 'react-router-dom';
import { SuccessModal } from './components';
import { Icon } from 'components/icon';
import { CartModal } from 'screens/cart-modal';
import { OrderModal } from 'screens/order-modal';
import {
  EditUserModal,
  ChangePassModal,
  EditAddressModal,
} from '../../screens/profile';
  import { useModal } from './modal.state';
import './modal.scss';

export const Modal = () => {
  const { pathname } = useLocation();
  const {
    isUser,
    isPass,
    isAddress,
    isCart,
    isOrder,
    isEditOnSuccess,
    setIsEditOnSuccess,
    handleModalClose,
    handleClose,
  } = useModal({ pathname });

  return (
    <div className="modal" onClick={handleModalClose}>
      {isEditOnSuccess
        ? <SuccessModal />
        : (
          <div className="modal__block">
            <div className="modal__header">
              <h1 className="modal__title">
                {isPass && 'Change Password'}
                {isUser && 'Change Profile'}
                {isAddress && 'Add a new address'}
                {isCart && 'Cart'}
                {isOrder && 'Order'}
              </h1>

              <button
                className="modal__close"
                onClick={handleClose}
              >
                <Icon type="close" />
              </button>
            </div>

            {isPass && <ChangePassModal setSuccess={setIsEditOnSuccess} />}

            {isUser && <EditUserModal setSuccess={setIsEditOnSuccess} />}

            {isAddress && <EditAddressModal setSuccess={setIsEditOnSuccess} />}

            {isCart && <CartModal pathname={pathname} />}

            {isOrder && <OrderModal />}
          </div>)
      }
    </div>
  );
};

