import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SuccessModal } from './components';
import { Icon } from 'components/icon';
import { CartModal } from 'screens/cart-modal';
import { NotificationsManager } from 'screens/notifications-manager';
import { OrderModal } from 'screens/order-modal';
import {
  EditUserModal,
  ChangePassModal,
  EditAddressModal,
} from '../../screens/profile';
import { Order } from 'screens/orders';
import { Payment } from 'screens/payment';
import { useModal } from './modal.state';
import './modal.scss';

export const Modal = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const {
    isUser,
    isPass,
    isAddress,
    isCart,
    isOrder,
    isPayment,
    isEditOnSuccess,
    isOrderNumber,
    isNotifications,
    setIsEditOnSuccess,
    handleModalClose,
    handleClose,
  } = useModal({ pathname, params });

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
                {isOrderNumber && `Order ${params.number}`}
                {isNotifications && 'Notifications'}
                {isPayment && 'Payment'}
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

            {isOrderNumber && <Order setSuccess={setIsEditOnSuccess} />}

            {isNotifications && <NotificationsManager />}

            {isPayment && <Payment />}
          </div>)
      }
    </div>
  );
};


