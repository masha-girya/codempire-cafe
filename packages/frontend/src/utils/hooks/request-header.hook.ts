import {
  STORAGE_CONSTANTS as STORAGE,
  API_HEADERS_CONSTANTS as API_HEADERS,
} from 'constants-app';
import { IContentType } from 'types';
import { getLocalItem } from 'utils/helpers';

interface IProps {
  headerFormData?: IContentType | null,
}

export const useRequestHeader = (props?: IProps) => {
  const token = getLocalItem(STORAGE.ACCESS_TOKEN);
  const requestHeader = {
    headers: {
      [API_HEADERS.AUTH]: `Bearer ${token}`,
      ...props?.headerFormData,
    }
  };

  return { requestHeader, token };
};
