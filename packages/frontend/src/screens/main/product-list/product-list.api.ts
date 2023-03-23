import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'utils/constants';
import { IDish, IMenu } from 'utils/types';
import { detectURL } from 'utils/helpers';

export const getDishes = async(filter: string[], sortBy: string) => {
  let URL = API.DISH;

  if(filter.length > 0 || sortBy.length > 0) {
    URL += detectURL(filter, sortBy);
  }

  const response: AxiosResponse<IDish[]> = await axios.get(
    API.BASE_URL + URL
  );

  return response.data;
};

export const getMenus = async(filter: string[], sortBy: string) => {
  let URL = API.MENU;

  if(filter.length > 0 || sortBy.length > 0) {
    URL += detectURL(filter, sortBy);
  }

  const response: AxiosResponse<IMenu[]> = await axios.get(
    API.BASE_URL + URL
  );

  return response.data;
};
