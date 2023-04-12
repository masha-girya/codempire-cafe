import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { Selection } from 'components/selection';
import { MainButton } from 'components/button';
import {
  ROUTE_CONSTANTS as ROUTE,
  SORT_CONSTANTS as SORT,
} from 'constants-app';
import './top-switcher.scss';

interface IProps {
  handleSortChange: (event: SelectChangeEvent<string>) => void,
  sortBy: string,
}

export const TopSwitcher = (props: IProps) => {
  const location = useLocation();
  const {
    handleSortChange,
    sortBy,
  } = props;

  const isWaiting = location.pathname.includes('waiting');
  const isCompleted = location.pathname.includes('completed');

  return (
    <div className="top-switcher">
      <div className="top-switcher__buttons">
        <Link to={ROUTE.ORDERS_WAITING}>
          <MainButton
            type="button"
            text="waiting"
            isSmall={true}
            isActive={isWaiting}
          />
        </Link>

        <Link to={ROUTE.ORDERS_COMPLETED}>
          <MainButton
            type="button"
            text="completed"
            isSmall={true}
            isActive={isCompleted}
          />
        </Link>
      </div>

      <div>
        <Selection
          handleChange={handleSortChange}
          sortBy={sortBy}
          sortingProps={SORT.ORDERS}
        />
      </div>
    </div>
  );
};
