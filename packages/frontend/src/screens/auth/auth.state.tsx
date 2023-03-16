import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    name,
    phone,
  } = useAppSelector(state => state.user);

  const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);
  const [ isValidEmail, setIsValidEmail ] = useState(true);
  const [ isNameValid, setIsNameValid ] = useState(true);
  const [ isPhoneValid, setIsPhoneValid ] = useState(true);

  useEffect(() => {
    if ((email.length && password.length) === 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [email, password]);

  return {
    isButtonDisabled,
    setIsButtonDisabled,
    navigate,
    isValidEmail,
    setIsValidEmail,
    isNameValid,
    setIsNameValid,
    isPhoneValid,
    setIsPhoneValid,
    email,
    password,
    name,
    phone,
  };
};
