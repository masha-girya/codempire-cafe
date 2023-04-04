import { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRequest } from 'utils/hooks';
import { useAppSelector } from 'store';
import { changePassword } from 'utils/api';
import { setLocalItem, validationPasswordChange } from 'utils/helpers';
import { STORAGE_CONSTANTS as STORAGE } from 'constants-app';
import { IPassword } from 'types';

interface IProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useChangePass = (props: IProps) => {
  const { setSuccess } = props;
  const { id } = useAppSelector((state) => state.user);
  const { sendUniqueRequest, isError, setIsError } = useRequest();

  const formik = useFormik({
    initialValues: {
      oldPass: '',
      newPass: '',
    },
    validationSchema: validationPasswordChange,
    onSubmit: async (values) => {
      const successEdit = await changePass(values);

      if (successEdit) {
        setSuccess(true);
      }
    },
  });

  const changePass = useCallback(async (passwords: IPassword) => {
    const { token } = await sendUniqueRequest(() =>
      changePassword(id, passwords)
    );

    setLocalItem(STORAGE.ACCESS_TOKEN, token.access_token);

    return true;
  }, []);

  useEffect(() => {
    setIsError(false);
  }, [formik.values]);

  return {
    formik,
    isError,
  };
};
