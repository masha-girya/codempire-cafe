import { useEffect, useState } from 'react';


export const useAuthForm = () => {
  const [ enteredEmail, setEnteredEmail ] = useState('');
  const [ enteredPassword, setEnteredPassword ] = useState('');
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);
  const [ isValidEmail, setIsValidEmail ] = useState(true);

  useEffect(() => {
    if (enteredEmail.length && enteredPassword.length) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [enteredEmail, enteredPassword]);

  return {
    isValidEmail,
    enteredEmail,
    enteredPassword,
    isButtonDisabled,
    setIsValidEmail,
    setEnteredEmail,
    setEnteredPassword,
    setIsButtonDisabled,
  };
};
