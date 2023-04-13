import axios, { AxiosResponse } from 'axios';
import { IOrder } from 'types';
import {
  API_CONSTANTS as API,
  STORAGE_CONSTANTS as STORAGE,
  API_HEADERS_CONSTANTS as API_HEADERS,
} from 'constants-app';
import { detectOrderURL, getLocalItem } from 'utils/helpers';

export const createOrder = async(data: Partial<IOrder>) => {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN);

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

export const changeOrder = async(number: string, data: Partial<IOrder>) => {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN);

  const response: AxiosResponse<IOrder> = await axios.patch(
    API.BASE_URL + API.ORDER_EDIT + '/' + number,
    data,
    {
      headers: {
        [API_HEADERS.AUTH]: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getOrders = async(status: string[], sortBy: string) => {
  const token = getLocalItem(API_HEADERS.AUTH);

  const URL = detectOrderURL(status, sortBy);

  const response: AxiosResponse<IOrder> = await axios.get(
    API.BASE_URL + API.ORDER + URL,
    {
      headers: {
        [API_HEADERS.AUTH]: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getOrderByNumber = async(number: string) => {
  const token = getLocalItem(API_HEADERS.AUTH);

  const response: AxiosResponse<IOrder> = await axios.get(
    API.BASE_URL + API.ORDER + '/' + number,
    {
      headers: {
        [API_HEADERS.AUTH]: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
