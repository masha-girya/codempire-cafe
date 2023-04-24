import axios, { AxiosResponse } from 'axios';
import { IOrder, IWatched } from 'types';
import { API_CONSTANTS as API } from 'constants-app';
import { detectOrderURL } from 'utils/helpers';
import { useRequestHeader } from 'utils/hooks';

export const createOrder = async(data: Partial<IOrder>) => {
  const { requestHeader } = useRequestHeader();

  const response: AxiosResponse<IOrder> = await axios.post(
    API.BASE_URL + API.ORDER,
    data,
    requestHeader,
  );

  return response.data;
};

export const changeOrder = async(number: string, data: Partial<IOrder>) => {
  const { requestHeader } = useRequestHeader();

  const response: AxiosResponse<IOrder> = await axios.patch(
    API.BASE_URL + API.ORDER_EDIT + '/' + number,
    data,
    requestHeader,
  );

  return response.data;
};

export const getOrders = async(
  status: string[],
  sortBy: string,
  watched?: IWatched,
) => {
  const { requestHeader } = useRequestHeader();
  const URL = detectOrderURL(status, sortBy, watched);

  const response: AxiosResponse<IOrder> = await axios.get(
    API.BASE_URL + API.ORDER + URL,
    requestHeader,
  );

  return response.data;
};

export const getOrderByNumber = async(number: string) => {
  const { requestHeader } = useRequestHeader();

  const response: AxiosResponse<IOrder> = await axios.get(
    API.BASE_URL + API.ORDER + '/' + number,
    requestHeader,
  );

  return response.data;
};
