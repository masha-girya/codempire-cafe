import * as yup from 'yup';

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

const validateDescription = yup
  .string()
  .min(40, 'Description must be at least 40 characters')
  .max(200, 'Description must be at to 200 characters')
  .required('Description is required');

const validateNumeric = yup
  .number()
  .positive()
  .integer()
  .required('Must be a positive integer');

const validateIngredients = yup
  .array()
  .min(1, 'Ingredients are required')
  .required();

export const validationProduct = yup.object({
  price: validateNumeric,
  weight: validateNumeric,
  description: validateDescription,
  ingredients: validateIngredients,
});
