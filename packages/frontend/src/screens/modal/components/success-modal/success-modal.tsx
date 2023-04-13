import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from 'components/icon';
import './success-modal.scss';

export const SuccessModal = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateBack = () => {
    const index = pathname.lastIndexOf('/');
    const link = pathname.slice(0, index);
    navigate(link);
  };

  const handleClose = () => {
    navigateBack();
  };

  return (
    <div className="success">
      <button
        className="success--close"
        onClick={handleClose}
      >
        <Icon type="close" />
      </button>

      <h1 className="success__title">
        Changed successfully!
      </h1>
    </div>
  );
};
