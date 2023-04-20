  import axios, { AxiosResponse } from 'axios';
import {
  API_CONSTANTS as API,
  API_HEADERS_CONSTANTS as API_HEADERS
} from 'constants-app';
import { IContentType, IDish, IMenu } from 'types';
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
  let headerFormData: IContentType | null = null;

  if (data instanceof FormData) {
    headerFormData = { [API_HEADERS.CONTENT_TYPE]: 'multipart/form-data' };
  }

  const { requestHeader } = useRequestHeader({ headerFormData});

  const response = await axios.patch(
    API.BASE_URL + API.DISH + '/' + id,
    data,
    requestHeader,
  );

  return response.data;
};

export const updateMenu = async (id: string, data: FormData | Partial<IMenu>) => {
  let headerFormData: IContentType | null = null;

  if (data instanceof FormData) {
    headerFormData = { [API_HEADERS.CONTENT_TYPE]: 'multipart/form-data' };
  }

  const { requestHeader } = useRequestHeader({ headerFormData});

  const response = await axios.patch(
    API.BASE_URL + API.MENU + '/' + id,
    data,
    requestHeader,
  );

  return response.data;
};

