import axios, { AxiosResponse } from 'axios';
import { ICategories } from 'types';
import { API_CONSTANTS as API } from 'constants-app';

export const getCategories = async () => {
  const response: AxiosResponse<ICategories> = await axios.get(
    API.BASE_URL + API.CATEGORIES
  );

  return response.data;
};
