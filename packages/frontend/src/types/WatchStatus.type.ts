import { ROLE } from '../types';

export type TWatchStatus = 'unwatched' | 'watched';

export interface IWatched {
  role: ROLE,
  status: TWatchStatus,
}
