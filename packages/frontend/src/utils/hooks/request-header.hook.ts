import {
  STORAGE_CONSTANTS as STORAGE,
  API_HEADERS_CONSTANTS as API_HEADERS,
} from 'constants-app';
import { getLocalItem } from 'utils/helpers';

export const useRequestHeader = () => {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN);

  const requestHeader = {
    headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
    }
  };

  const requestHeaderFormData = {
    headers: {
      ...requestHeader.headers,
      [API_HEADERS.CONTENT_TYPE]: 'multipart/form-data',
    }
  };

  return { requestHeader, requestHeaderFormData, token };
};
