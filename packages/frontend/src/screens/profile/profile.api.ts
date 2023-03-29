import axios, { AxiosResponse } from 'axios';
import {
  API_CONSTANTS as API,
  API_HEADERS_CONSTANTS as API_HEADERS
} from 'utils/constants';
import { IUser } from 'utils/types';

export const getUser = async(email: string, token: string) => {
  const response: AxiosResponse<IUser> = await axios.get(
    API.BASE_URL + API.USER + '/' + email,
    {headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
    }}
  );

  return response.data;
};