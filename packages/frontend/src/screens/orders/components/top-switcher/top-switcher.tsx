import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { Selection } from 'components/selection';
import { MainButton } from 'components/button';
import {
  PATHNAME_CONSTANTS as PATHNAME,
  ROUTE_CONSTANTS as ROUTE,
  SORT_CONSTANTS as SORT,
} from 'constants-app';
import './top-switcher.scss';

interface IProps {
  handleSortChange: (event: SelectChangeEvent<string>) => void,
  sortBy: string,
}

export const TopSwitcher = (props: IProps) => {
  const { pathname } = useLocation();
  const {
    handleSortChange,
    sortBy,
  } = props;

  const isCompleted = pathname.includes(PATHNAME.ORDER_COMPLETED);
  const isWaiting = pathname.includes(PATHNAME.ORDER_WAITING) || !isCompleted;

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
          label="Sorting by"
        />
      </div>
    </div>
  );
};
