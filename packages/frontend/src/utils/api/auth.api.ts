import axios, { AxiosResponse } from 'axios';
import {
  API_CONSTANTS as API,
  STORAGE_CONSTANTS as STORAGE,
} from 'constants-app';
import { setLocalItem } from 'utils/helpers';
import { IPassword, IUser } from 'types';
import { useRequestHeader } from 'utils/hooks';

export async function signUp(email: string, password: string) {
  const user = await axios.post(API.BASE_URL + API.REGISTRATION_URL, {
    email,
    password,
  });

  return user.data;
}

export async function login(email: string, password: string) {
  const response = await axios.post(API.BASE_URL + API.LOGIN_URL, {
    email,
    password,
  });

  setLocalItem(STORAGE.ACCESS_TOKEN, response.data.access_token);

  return true;
}

export async function validateToken() {
  const { requestHeader, token } = useRequestHeader();

  if (!token) {
    return null;
  }

  const response: AxiosResponse<IUser> = await axios.get(
    API.BASE_URL + API.VALIDATE_TOKEN_URL,
    requestHeader,
  );

  return { user: response.data, token };
}

export async function changePassword(id: string, passwords: IPassword) {
  const { requestHeader } = useRequestHeader();

  const user = await axios.patch(
    API.BASE_URL + API.USER_CHANGE_PASS + '/' + id,
    passwords,
    requestHeader,
  );

  return user.data;
}
