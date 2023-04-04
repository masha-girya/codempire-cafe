import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRequest } from 'utils/hooks';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'store';
import { updateUser } from 'utils/api';
import { userActions } from 'store/features';
import { setLocalItem, validationUser } from 'utils/helpers';
import { STORAGE_CONSTANTS as STORAGE } from 'constants-app';
import { IUser } from 'types';

interface IProps {
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

export const useEditUserModal = (props: IProps) => {
  const { setSuccess } = props;
  const dispatch = useAppDispatch();
  const { sendUniqueRequest, isError, setIsError } = useRequest();

  const { id, email, phone, name, surname, avatar } = useAppSelector(
    (state) => state.user
  );

  const [avatarOnEdit, setAvatarOnEdit] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      name: `${name} ${surname}`,
      email: email,
      phone: phone,
    },
    validationSchema: validationUser,
    onSubmit: async (values) => {
      const successEdit = await editUser(values);

      if (successEdit) {
        setSuccess(true);
      }
    },
  });

  const editUser = async (values: Pick<IUser, 'name' | 'email' | 'phone'>) => {
    const { email, name, phone } = values;

    const formData = new FormData();

    if (avatarOnEdit) {
      formData.append(
        'avatar',
        new Blob([avatarOnEdit], { type: 'image/jpeg' }),
        avatarOnEdit.name
      );
    }

    const validName = name.split(' ');

    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('name', validName[0]);
    formData.append('surname', validName[1]);

    const request = () => updateUser(id, formData);

    const { user, token } = await sendUniqueRequest(request);

    setLocalItem(STORAGE.ACCESS_TOKEN, token.access_token);

    await dispatch(userActions.setUser(user));

    return true;
  };

  useEffect(() => {
    setIsError(false);
  }, [formik.values]);

  return {
    formik,
    avatar,
    isError,
    avatarOnEdit,
    setIsError,
    setAvatarOnEdit,
  };
};
