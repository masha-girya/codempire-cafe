import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components/icon';
import './back-button.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleClick}
    >
      <Icon type="back" />
      Back
    </button>
  );
};
