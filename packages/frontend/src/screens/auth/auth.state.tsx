import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { useRequest } from 'utils/hooks';
import { validateToken } from '../auth';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';

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

  const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);
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
    if (!(email.length && password.length)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [email, password]);

  useEffect(() => {
    checkUser();

    if(isUser && !location.hash.includes('registration')) {
      navigate(ROUTE.MAIN_PAGE_DISH);
    }
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
    id,
  };
};
