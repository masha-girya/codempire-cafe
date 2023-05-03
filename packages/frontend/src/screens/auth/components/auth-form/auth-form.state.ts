import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { validationLogin } from 'utils/helpers';
import { useRequest } from 'utils/hooks';
import { login, signUp } from 'utils/api';
import { useAppDispatch } from 'store';
import { userActions } from 'store/features';
import { ROUTE_CONSTANTS as ROUTE } from 'constants-app';

interface IProps {
  isSignUp: boolean;
}

export const useAuthForm = (props: IProps) => {
  const { sendAuthRequest, isError, setIsError, isLoading } = useRequest();
  const { isSignUp } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationLogin,
    onSubmit: async (values) => {
      const { email, password } = values;

      switch (isSignUp) {
        case true:
          await sendAuthRequest(async () => {
            const res = await signUp(email, password);
            if (res) {
              dispatch(userActions.setUser(res));
              await login(email, password);
              navigate(ROUTE.REGISTRATION_ADD_INFO);
            }
          });
          break;

        case false:
          await sendAuthRequest(async () => {
            const res = await login(email, password);
            if (res) {
              navigate(ROUTE.MAIN_PAGE_DISHES);
            }
          });
          break;

        default:
          break;
      }
    },
  });

  const { values } = formik;

  const handleSkipClick = () => {
    navigate(ROUTE.MAIN_PAGE_DISHES);
  };

  useEffect(() => {
    if(values.email.length && values.password.length) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [values.email, values.password]);

  useEffect(() => {
    setIsError(false);
  }, [values.email, values.password, isSignUp]);

  return {
    formik,
    handleSkipClick,
    isError,
    isLoading,
    isButtonDisabled,
  };
};
