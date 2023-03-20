import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'utils/constants';
import { IDish } from 'utils/types';

export const getDishes = async() => {
  const response: AxiosResponse<IDish[]> = await axios.get(
    API.BASE_URL + API.DISH
  );

  return response.data;
};
