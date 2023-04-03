import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SuccessModal } from 'components/success-modal';
import { Icon } from 'components/icon';
import {
  EditUserModal,
  ChangePassModal,
  EditAddressModal,
  useModal,
} from '../../profile';
import { CartModal } from '../../../screens/cart-modal';
import './modal.scss';

export const Modal = () => {
  const { pathname } = useLocation();
  const {
    isEditOnSuccess,
    setIsEditOnSuccess,
    navigate,
  } = useModal();

  const isUser = pathname.includes('user');
  const isPass = pathname.includes('pass');
  const isAddress = pathname.includes('address');
  const isCart = pathname.includes('cart');

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(event.target === event.currentTarget) {
      navigate(-1);
      setIsEditOnSuccess(false);
    }
  };

  const handleClose = useCallback(() => {
    navigate(-1);
  }, []);

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

            {isCart && <CartModal />}
          </div>)
      }
    </div>
  );
};


