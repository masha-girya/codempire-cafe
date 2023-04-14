import axios, { AxiosResponse } from 'axios';
import { API_CONSTANTS as API } from 'constants-app';
import { IUser } from 'types';
import { useRequestHeader } from 'utils/hooks';

export const getUser = async (id: string) => {
  const { requestHeader } = useRequestHeader();

  const response: AxiosResponse<IUser> = await axios.get(
    API.BASE_URL + API.USER + '/' + id,
    requestHeader,
  );

  return response.data;
};

export const deleteUser = async (id: string) => {
  const { requestHeader } = useRequestHeader();

  await axios.delete(
  API.BASE_URL + API.USER + '/' + id,
  requestHeader,
  );
};
