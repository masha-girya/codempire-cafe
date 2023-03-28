export const validateName = (enteredName: string) => {
  if(!enteredName) {
    return false;
  }

  const fullEnteredName = enteredName.trim().split(' ');

  if (fullEnteredName.length === 2) {
    return fullEnteredName;
  }

  return false;
};

export const validatePhone = (enteredPhone: string) => {
  if(!enteredPhone) {
    return false;
  }

  const phone = enteredPhone.split(' ').join('');

  if (phone.length === 13
    && enteredPhone.startsWith('+380')
    && enteredPhone.split(' ').slice(1).every(num => Number(num))
  ) {
    return true;
  }

  return false;
};

export const validateEmail = (enteredEmail: string) => {
  if(!enteredEmail) {
    return '';
  }

  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(enteredEmail);
};
