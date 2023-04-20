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

const validateArray = yup
  .array()
  .min(1, 'This field is required')
  .required()
;

const validateTitle = yup
  .string()
  .min(2, 'Title has to be from 2 characters')
  .max(20, 'Title has to be to 20 characters')
  .required();

const validateImage = yup
  .string()
  .min(1, 'Image is required')
  .required();

const validateCategoryOnAdd = yup
  .string()
  .test('category-exists', 'This category is already added', function(value) {
    return !this.parent.categories.includes(value);
  });

const validateAllergenOnAdd = yup
  .string()
  .test('allergen-exists', 'This allergen is already added', function(value) {
    return !this.parent.allergens.includes(value);
  });

const validateIngredientOnAdd = yup
  .string()
  .test('ingredient-exists', 'This ingredient is already added', function(value) {
    return !this.parent.ingredients.includes(value);
  });

export const validationProduct = yup.object({
  price: validateNumeric,
  weight: validateNumeric,
  title: validateTitle,
  description: validateDescription,
  ingredients: validateArray,
  categories: validateArray,
  categoryOnAdd: validateCategoryOnAdd,
  allergenOnAdd: validateAllergenOnAdd,
  ingredientOnAdd: validateIngredientOnAdd,
  image: validateImage,
});

export const validationMenu = yup.object({
  price: validateNumeric,
  title: validateTitle,
  description: validateDescription,
  ingredients: validateArray,
  image: validateImage,
});
