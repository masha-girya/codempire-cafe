import { getUser } from 'screens/profile';
import { useAppDispatch } from 'store';
import { validateToken } from 'screens/auth';
import { userActions } from 'store/features';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const checkUser = async() => {
    const { user: validUser, token } = await validateToken();

    if(!validUser) {
      return;
    }

    const user = await getUser(validUser.email, token);

    dispatch(userActions.setUser(user));

    return validUser;
  };

  return { checkUser };
};
