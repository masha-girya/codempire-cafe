import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'constants-app';
import { SORT } from 'types';

export const getCategories = async (sort: SORT) => {
  const response: AxiosResponse<string[]> = await axios.get(
    API.BASE_URL + API.DISH + '/sort?sort=' + sort
  );

  return response.data;
};
