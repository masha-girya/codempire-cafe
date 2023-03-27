import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { useRequest } from 'utils/hooks';
import { validateToken } from '../auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const { sendUniqueRequest } = useRequest();
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
  const [ isUser, setIsUser ] = useState(true);

  const checkUser = useCallback(async() => {
    const { user } = await sendUniqueRequest(validateToken);

    if(!user) {
      setIsUser(false);
    }
  }, [isUser]);

  useEffect(() => {
    if (!(email.length && password.length)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [email, password]);

  useEffect(() => {
    checkUser();
  }, [isUser]);

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
    isUser,
  };
};
