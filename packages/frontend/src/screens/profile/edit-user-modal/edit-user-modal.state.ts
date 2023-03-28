import { useState } from 'react';
import { useRequest } from 'utils/hooks';
import { useAppDispatch, useAppSelector } from 'store';
import { updateUser } from '../../auth';
import { userActions } from 'store/features';
import {
  validatePhone,
  validateName,
  validateEmail,
  setLocalItem,
} from 'utils/helpers';
import { STORAGE_CONSTANTS as STORAGE } from 'utils/constants';

export const useEditUserModal = () => {
  const dispatch = useAppDispatch();
  const { sendUniqueRequest } = useRequest();
  const {
    id,
    email,
    phone,
    name,
    surname,
  } = useAppSelector(state => state.user);

  const [ isEditOnSuccess, setIsEditOnSuccess ] = useState(false);

  const [ isEmailValid, setIsEmailValid ] = useState(true);
  const [ isNameValid, setIsNameValid ] = useState(true);
  const [ isPhoneValid, setIsPhoneValid ] = useState(true);

  const [ emailOnEdit, setEmailOnEdit ] = useState(email);
  const [ phoneOnEdit, setPhoneOnEdit ] = useState(phone);
  const [ nameOnEdit, setNameOnEdit ] = useState(`${name} ${surname}`);

  const editUser = async() => {
    const validName = validateName(nameOnEdit);
    const isValidPhone = validatePhone(phoneOnEdit);
    const isValidEmail = validateEmail(emailOnEdit);

    if(!validName) {
      setIsNameValid(false);
      return false;
    }

    if(!isValidEmail) {
      setIsEmailValid(false);
      return false;
    }

    if(!isValidPhone) {
      setIsPhoneValid(false);
      return false;
    }

    const request = () => updateUser(id, {
      email: emailOnEdit,
      phone: phoneOnEdit,
      name: validName[0],
      surname: validName[1],
    });

    const { user, token } = await sendUniqueRequest(request);

    setLocalItem(STORAGE.ACCESS_TOKEN, token.access_token);

    await dispatch(userActions.setUser(user));

    return true;
  };

  return {
    editUser,
    nameOnEdit,
    emailOnEdit,
    phoneOnEdit,
    isNameValid,
    isEmailValid,
    isPhoneValid,
    isEditOnSuccess,
    setIsEmailValid,
    setIsNameValid,
    setIsPhoneValid,
    setNameOnEdit,
    setEmailOnEdit,
    setPhoneOnEdit,
    setIsEditOnSuccess,
  };
};