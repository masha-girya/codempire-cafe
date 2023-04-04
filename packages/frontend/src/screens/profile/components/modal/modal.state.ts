import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useModal = () => {
  const navigate = useNavigate();
  const [ isEditOnSuccess, setIsEditOnSuccess ] = useState(false);

  return { isEditOnSuccess, setIsEditOnSuccess, navigate };
};
