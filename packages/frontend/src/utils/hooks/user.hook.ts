import { useAppDispatch } from 'store';
import { getUser, validateToken } from 'utils/api';
import { userActions } from 'store/features';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const checkUser = async() => {
    const localToken = await validateToken();

    if(!localToken) {
      return null;
    }

    const { user: validUser, token } = localToken;

    const user = await getUser(validUser.id, token);

    dispatch(userActions.setUser(user));

    return validUser;
  };

  const removeUser = () => {
    dispatch(userActions.clearUser());
  };

  return { checkUser, removeUser };
};
