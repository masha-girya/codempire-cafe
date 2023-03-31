import * as yup from 'yup';

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

const nameValidation = yup
  .string()
  .required('Name is required')
  .min(3, 'Must be at least 3 characters')
  .max(20, 'Must be to 20 characters')
  .test('fullname-exist', 'Name should be written as Name Surname', function(value) {
    const fullName = value.trim().split(' ');

    return fullName.length === 2;
  });

const emailValidation = yup
  .string()
  .required('Password is required')
  .email('Please enter a valid email')
  .test('email-valid', 'Please enter a valid email', function(value) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  });
  
const phoneValidation = yup
  .string()
  .required('Phone is required')
  .min(10, 'Please, enter by pattern: +380 99 99 99 999')
  .max(17, 'Please, enter by pattern: +380 99 99 99 999')
  .test('phone-valid', 'Please, enter by pattern: +380 99 99 99 999', function(value) {
    const isNumbers = value
    .split('')
    .filter(n => n !== ' ' && n !== '+')
    .every(num => !isNaN(Number(num)));

    return value.startsWith('+380') && isNumbers;
  });

const passValidation = yup
  .string()
  .required('Password is required');

export const validationUser = yup.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
});


export const validationPasswordChange = yup.object({
  oldPass: passValidation,
  newPass: passValidation
    .test('passwords-match', 'New password must be different from old password', function(value) {
      return value !== this.parent.oldPass;
    }),
});

export const validationLogin = yup.object({
  email: emailValidation,
  password: passValidation,
});

export const validationSingUp = yup.object({
  name: nameValidation,
  phone: phoneValidation,
});
