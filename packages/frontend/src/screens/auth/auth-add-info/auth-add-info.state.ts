import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { validationSingUp } from 'utils/helpers';
import { useRequest } from 'utils/hooks';
import { updateUser } from 'utils/api';
import { useAppSelector } from 'store';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';

export const useAuthAddInfo = () => {
  const { sendAuthRequest } = useRequest();
  const navigate = useNavigate();

  const { id, email } = useAppSelector((state) => state.user);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: validationSingUp,
    onSubmit: async (values) => {
      const { name, phone } = values;
      const validName = name.trim().split(' ');

      await sendAuthRequest(async () => {
        const { user } = await updateUser(id, {
          email,
          name: validName[0],
          surname: validName[1],
          phone,
        });

        if (user) {
          navigate(ROUTE.MAIN_PAGE_DISH);
          return;
        }

        navigate(ROUTE.ERROR);
      });
    },
  });

  const { values } = formik;

  useEffect(() => {
    if (values.name.length && values.phone.length) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [values.name, values.phone]);

  return {
    formik,
    isButtonDisabled,
  };
};
