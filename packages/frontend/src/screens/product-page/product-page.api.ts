import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'utils/constants';
import { IDish, IMenu } from 'utils/types';

export const getDish = async(id: string) => {
  const response: AxiosResponse<IDish> = await axios.get(
    API.BASE_URL + API.DISH + '/' + id
  );

  return response.data;
};

export const getMenu = async(id: string) => {
  const response: AxiosResponse<IMenu> = await axios.get(
    API.BASE_URL + API.MENU + '/' + id
  );

  return response.data;
};
