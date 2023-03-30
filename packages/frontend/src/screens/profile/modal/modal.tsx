import React from 'react';
import { SuccessModal } from 'components/success-modal';
import { Icon } from 'components/icon';
import { EditUserModal } from '../../profile/edit-user-modal';
import { ChangePassModal } from '../../profile/change-pass-modal';
import { useModal } from '../../profile/modal';
import './modal.scss';

interface IProps {
  isPass: boolean,
}

export const Modal = (props: IProps) => {
  const {
    isEditOnSuccess,
    setIsEditOnSuccess,
    navigate,
  } = useModal();

  const { isPass } = props;

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(event.target === event.currentTarget) {
      navigate('/profile');
      setIsEditOnSuccess(false);
    }
  };

  const handleClose = () => {
    navigate('/profile');
  };

  return (
    <div className="modal" onClick={handleModalClose}>
      {isEditOnSuccess
        ? <SuccessModal />
        : (
          <div className="modal__block">
            <div className="modal__header">
              <h1 className="modal__title">
                Change
                {isPass ? ' Password' : 'Profile'}
              </h1>

              <button
                className="modal__close"
                onClick={handleClose}
              >
                <Icon type="close" />
              </button>
            </div>

            {isPass
              ? <ChangePassModal setSuccess={setIsEditOnSuccess} />
              : <EditUserModal setSuccess={setIsEditOnSuccess} />
            }
          </div>)
      }
    </div>
  );
};


