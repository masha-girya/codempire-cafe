import { IWatched, ROLE } from 'types';
import { API_CONSTANTS as API } from 'constants-app';

export const detectURL = (filter: string[], sortBy: string) => {
  const URL_FILTER = API.FILTER + filter.join(`&${API.FILTER}`);

  if (sortBy.length > 0 && filter.length > 0) {
    return '?' + URL_FILTER + '&' + API.SORT + sortBy;
  }

  if (filter.length > 0) {
    return '?' + URL_FILTER;
  }

  if (sortBy.length > 0) {
    return '?' + API.SORT + sortBy;
  }
};

export const detectOrderURL = (
  status: string[],
  sortBy: string,
  watched?: IWatched,
) => {
  let URL = '?'
    + API.STATUS
    + status.join(`&${API.STATUS}`)
    + `&${API.SORT}${sortBy}`;

  if(watched) {
    const watchQuery = watched.role === ROLE.user
      ? API.WATCHED_USER
      : API.WATCHED_MANAGER;

    URL += `&${watchQuery}${watched.status}`;
  }

  return URL;
};
