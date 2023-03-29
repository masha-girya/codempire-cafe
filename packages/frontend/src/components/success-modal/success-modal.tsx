import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/icon';
import './success-modal.scss';

export const SuccessModal = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/profile');
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
