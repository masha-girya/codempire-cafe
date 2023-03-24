import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'utils/constants';
import { ISearchProduct } from 'utils/types';

export const getSearchProducts = async(query: string) => {
  const response: AxiosResponse<ISearchProduct> = await axios.get(
    API.BASE_URL + API.MENU + API.SEARCH + query
  );

  return response.data;
};
