  import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'constants-app';
import { IDish, IMenu } from 'types';
import { useRequestHeader } from 'utils/hooks';

export const getDish = async (id: string) => {
  const response: AxiosResponse<IDish> = await axios.get(
    API.BASE_URL + API.DISH + '/' + id
  );

  return response.data;
};

export const getDishesNames = async() => {
  const response: AxiosResponse<string[]> = await axios.get(
    API.BASE_URL + API.DISH + API.NAMES
  );

  return response.data;
};

export const getRecommendedDishes = async (id: string) => {
  const response: AxiosResponse<IDish[]> = await axios.get(
    API.BASE_URL + API.DISH + API.RECOMMENDED + '/' + id
  );

  return response.data;
};

export const deleteDish = async (id: string) => {
  const { requestHeader } = useRequestHeader();

  const response = await axios.delete(
    API.BASE_URL + API.DISH + '/' + id,
    requestHeader,
  );

  return response.data;
};

export const getMenu = async (id: string) => {
  const response: AxiosResponse<IMenu> = await axios.get(
    API.BASE_URL + API.MENU + '/' + id
  );

  return response.data;
};

export const getRecommendedMenus = async (id: string) => {
  const response: AxiosResponse<IDish[]> = await axios.get(
    API.BASE_URL + API.MENU + API.RECOMMENDED + '/' + id
  );

  return response.data;
};

export const deleteMenu = async (id: string) => {
  const { requestHeader } = useRequestHeader();

  const response = await axios.delete(
    API.BASE_URL + API.MENU + '/' + id,
    requestHeader,
  );

  return response.data;
};

export const updateDish = async (id: string, data: FormData | Partial<IDish>) => {
  const { requestHeaderFormData, requestHeader } = useRequestHeader();

  const headers = data instanceof FormData
    ? requestHeaderFormData
    : requestHeader;

  const response = await axios.patch(
    API.BASE_URL + API.DISH + '/' + id,
    data,
    headers,
  );

  return response.data;
};

export const updateMenu = async (id: string, data: FormData | Partial<IMenu>) => {
  const { requestHeaderFormData, requestHeader } = useRequestHeader();

  const headers = data instanceof FormData
    ? requestHeaderFormData
    : requestHeader;

  const response = await axios.patch(
    API.BASE_URL + API.MENU + '/' + id,
    data,
    headers,
  );

  return response.data;
};

export const addDish = async(data: FormData | Omit<IDish, 'id'>) => {
  const { requestHeaderFormData, requestHeader } = useRequestHeader();

  const headers = data instanceof FormData
    ? requestHeaderFormData
    : requestHeader;

  const response = await axios.post(
    API.BASE_URL + API.DISH,
    data,
    headers,
  );

  return response.data;
};

export const addMenu = async(data: FormData | Omit<IMenu, 'id'>) => {
  const { requestHeaderFormData, requestHeader } = useRequestHeader();

  const headers = data instanceof FormData
    ? requestHeaderFormData
    : requestHeader;

  const response = await axios.post(
    API.BASE_URL + API.MENU,
    data,
    headers,
  );

  return response.data;
};
