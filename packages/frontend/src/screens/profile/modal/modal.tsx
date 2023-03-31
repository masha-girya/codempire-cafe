import React, { useCallback } from 'react';
import { SuccessModal } from 'components/success-modal';
import { Icon } from 'components/icon';
import {
  EditUserModal,
  ChangePassModal,
  EditAddressModal,
  useModal,
} from '../../profile';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';
import './modal.scss';
import { useLocation } from 'react-router-dom';

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

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(event.target === event.currentTarget) {
      navigate(ROUTE.PROFILE);
      setIsEditOnSuccess(false);
    }
  };

  const handleClose = useCallback(() => {
    navigate(ROUTE.PROFILE);
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
          </div>)
      }
    </div>
  );
};


