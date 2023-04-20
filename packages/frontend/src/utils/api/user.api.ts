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

export async function updateUser(id: string, data: Partial<IUser> | FormData) {
  const { requestHeaderFormData, requestHeader } = useRequestHeader();

  const headers = data instanceof FormData
    ? requestHeaderFormData
    : requestHeader;

  const user = await axios.patch(
    API.BASE_URL + API.USER_EDIT + '/' + id,
    data,
    headers,
  );

  return user.data;
}

export const deleteUser = async (id: string) => {
  const { requestHeader } = useRequestHeader();

  await axios.delete(
  API.BASE_URL + API.USER + '/' + id,
  requestHeader,
  );
};
