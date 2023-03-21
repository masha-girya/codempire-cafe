import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'utils/constants';
import { IDish, IMenu } from 'utils/types';

export const getDishes = async() => {
  const response: AxiosResponse<IDish[]> = await axios.get(
    API.BASE_URL + API.DISH
  );

  return response.data;
};

export const getMenus = async() => {
  const response: AxiosResponse<IMenu[]> = await axios.get(
    API.BASE_URL + API.MENU
  );

  return response.data;
};
