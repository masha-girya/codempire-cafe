import { TWatchStatus } from '../types';

export interface IOrderQuery {
  status: string[],
  sortBy: string,
  watchedManager: TWatchStatus,
  watchedUser: TWatchStatus,
}