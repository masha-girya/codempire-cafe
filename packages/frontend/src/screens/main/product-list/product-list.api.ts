import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'utils/constants';
import { IDish, IMenu } from 'utils/types';

export const getDishes = async(filter: string[]) => {
  let URL;

  if(filter.length === 0) {
    URL = API.DISH_FILTER;
  } else {
    URL = API.DISH_FILTER + filter.join('&filter=');
  }

  const response: AxiosResponse<IDish[]> = await axios.get(
    API.BASE_URL + URL
  );

  return response.data;
};

export const getMenus = async(filter: string[]) => {
  let URL;

  if(filter.length === 0) {
    URL = API.MENU_FILTER;
  } else {
    URL = API.MENU_FILTER + filter.join('&filter=');
  }

  const response: AxiosResponse<IMenu[]> = await axios.get(
    API.BASE_URL + URL
  );

  return response.data;
};
