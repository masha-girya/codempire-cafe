import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { useRequest } from 'utils/hooks';
import { validateToken } from '../auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { sendUniqueRequest } = useRequest();
  const {
    id,
    email,
    password,
    name,
    phone,
  } = useAppSelector(state => state.user);

  const [ isValidEmail, setIsValidEmail ] = useState(true);
  const [ isNameValid, setIsNameValid ] = useState(true);
  const [ isPhoneValid, setIsPhoneValid ] = useState(true);
  const [ isUser, setIsUser ] = useState(false);

  const checkUser = useCallback(async() => {
    const user = await sendUniqueRequest(validateToken);

    if(user) {
      setIsUser(true);
    }
  }, []);

  useEffect(() => {
    checkUser();

    if(isUser && !location.hash.includes('registration')) {
      setIsUser(false);
    }
  }, [isUser]);

  return {
    id,
    name,
    email,
    phone,
    isUser,
    password,
    isNameValid,
    isPhoneValid,
    isValidEmail,
    navigate,
    setIsNameValid,
    setIsPhoneValid,
    setIsValidEmail,
  };
};
