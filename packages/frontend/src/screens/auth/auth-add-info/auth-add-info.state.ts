import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { validationSingUp } from 'utils/helpers';
import {
  useAuthRequest,
  updateUser,
} from '../../../screens/auth';
import { useAppDispatch, useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'utils/constants';

export const useAuthAddInfo = () => {
  const {
    sendAuthRequest,
    isError,
  } = useAuthRequest();
  const { id, email } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: validationSingUp,
    onSubmit: async(values) => {
      const { name, phone } = values;
      const validName = name.trim().split(' ');

      await sendAuthRequest(async() => {
        const { user } = await updateUser(id, {
          email,
          name: validName[0],
          surname: validName[1],
          phone,
        });
  
        if(user) {
          navigate(ROUTE.MAIN_PAGE_DISH);
          return;
        }
  
        navigate(ROUTE.ERROR);
      });
      },
  });

  return {
    formik,
    navigate,
    isError,
  };
};
