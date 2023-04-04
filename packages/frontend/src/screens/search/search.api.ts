import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'constants-app';
import { ISearchProduct } from 'types';

export const getSearchProducts = async (query: string) => {
  const response: AxiosResponse<ISearchProduct> = await axios.get(
    API.BASE_URL + API.MENU + API.SEARCH + query
  );

  return response.data;
};
