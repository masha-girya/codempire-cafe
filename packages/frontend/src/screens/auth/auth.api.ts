import axios, { AxiosResponse } from 'axios';
import {
  API_CONSTANTS as API,
  STORAGE_CONSTANTS as STORAGE,
  API_HEADERS_CONSTANTS as API_HEADERS
} from 'utils/constants';
import { getLocalItem, setLocalItem } from 'utils/helpers';
import { IPassword, IUser } from 'utils/types';

export async function signUp(email: string, password: string) {
  const user = await axios.post(
    API.BASE_URL + API.REGISTRATION_URL, {
    email,
    password,
  });

  return user.data;
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
  const token = getLocalItem(STORAGE.ACCESS_TOKEN);

  if(!token) {
    return null;
  }

  const response: AxiosResponse<IUser> = await axios.get(
    API.BASE_URL + API.VALIDATE_TOKEN_URL,
    {headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
    }});

  return { user: response.data , token };
}

export async function updateUser(id: string, data: Partial<IUser> | FormData) {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN) || '';

  const user = await axios.patch(
    API.BASE_URL + API.USER_EDIT + '/' + id,
    data,
    {headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }}
  );

  return user.data;
}

export async function changePassword(id: string, passwords: IPassword) {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN) || '';

  const user = await axios.patch(
    API.BASE_URL + API.USER_CHANGE_PASS + '/' + id,
    passwords,
    {headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
    }}
  );

  return user.data;
}
