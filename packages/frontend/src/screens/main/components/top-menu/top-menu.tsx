import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { MainButton } from 'components/button';
import { Selection } from 'components/selection';
import { FilterContext } from 'screens/main';
import {
  SORT_CONSTANTS as SORT,
  ROUTE_CONSTANTS as ROUTE,
} from 'constants-app';
import './top-menu.scss';

interface IProps {
  isLocationDish: boolean,
  isLocationMenu: boolean,
}

export const TopMenu = (props: IProps) => {
  const { isLocationDish, isLocationMenu } = props;
  const { sortBy, setSortBy } = useContext(FilterContext);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="top-menu">
      <div className="top-menu__buttons">
        <Link to={ROUTE.MAIN_PAGE_DISH}>
          <MainButton
            type="button"
            text="dish"
            isSmall={true}
            isActive={isLocationDish}
          />
        </Link>

        <Link to={ROUTE.MAIN_PAGE_MENU}>
          <MainButton
            type="button"
            text="menu"
            isSmall={true}
            isActive={isLocationMenu}
          />
        </Link>
      </div>

      <div>
        <Selection
          handleChange={handleChange}
          sortBy={sortBy}
          sortingProps={SORT.PRODUCTS}
        />
      </div>
    </div>
  );
};
