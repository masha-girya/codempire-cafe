import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'constants-app';
import { IDish, IMenu } from 'types';

export const getDish = async (id: string) => {
  const response: AxiosResponse<IDish> = await axios.get(
    API.BASE_URL + API.DISH + '/' + id
  );

  return response.data;
};

export const getRecommendedDishes = async (id: string) => {
  const response: AxiosResponse<IDish[]> = await axios.get(
    API.BASE_URL + API.DISH + API.RECOMMENDED + '/' + id
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