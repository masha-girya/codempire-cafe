import axios, { AxiosResponse } from 'axios';
import {
  API_CONSTANTS as API,
  STORAGE_CONSTANTS as STORAGE,
  API_HEADERS_CONSTANTS as API_HEADERS
} from 'utils/constants';
import { getLocalItem, setLocalItem } from 'utils/helpers';
import { IUser } from 'utils/types';

export async function signUp(email: string, password: string) {
  await axios.post(
    API.BASE_URL + API.REGISTRATION_URL, {
    email,
    password,
  });

  return true;
}

export async function login(email: string, password: string) {
    const response = await axios.post(
    API.BASE_URL + API.LOGIN_URL, {
    email,
    password,
  });

  setLocalItem(STORAGE.ACCESS_TOKEN, response.data.access_token);

  return true;
}

export async function validateToken() {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN) || '';

  const response: AxiosResponse<IUser> = await axios.get(
    API.BASE_URL + API.VALIDATE_TOKEN_URL,
    {headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
    }});

  return { user: response.data , token };
}

export async function updateUser(data: Partial<IUser>) {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN) || '';

  await axios.patch(
    API.BASE_URL + API.USER_EDIT,
    data,
    {headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
    }}
  );

  return true;
}
