import { API_CONSTANTS as API } from 'utils/constants';

export const detectURL = (filter: string[], sortBy: string) => {
  const URL_FILTER = API.FILTER + filter.join(`&${API.FILTER}`);

  if(sortBy.length > 0 && filter.length > 0) {
    return '?' + URL_FILTER + '&' + API.SORT + sortBy;
  }

  if(filter.length > 0) {
    return '?' + URL_FILTER;
  }

  if(sortBy.length > 0) {
    return '?' + API.SORT + sortBy;
  }
};