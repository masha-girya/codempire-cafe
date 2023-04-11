import axios, { AxiosResponse } from 'axios';
import { IOrder } from 'types';
import {
  API_CONSTANTS as API,
  API_HEADERS_CONSTANTS as API_HEADERS,
} from 'constants-app';
import { getLocalItem } from 'utils/helpers';

export const createOrder = async(data: Partial<IOrder>) => {
  const token = getLocalItem(API_HEADERS.AUTH);

  const response: AxiosResponse<IOrder> = await axios.post(
    API.BASE_URL + API.ORDER,
    data,
    {
      headers: {
        [API_HEADERS.AUTH]: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
