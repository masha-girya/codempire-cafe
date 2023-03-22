import React, { useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FilterContext } from 'screens/main';
import './filter-bar.scss';

interface IProps {
  categories: string[],
  title: string,
}

export const FilterBar = (props: IProps) => {
  const { categories, title } = props;
  const { filter, setFilter } = useContext(FilterContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if(filter.includes(value)) {
      setFilter((prev: string[]) => prev.filter(state => state !== value));
      return;
    }

    setFilter((prev: string[]) => [...prev, value]);
  };

  return (
  <div className="filter-bar">
      <h3 className="filter-bar__title">
        {title}
      </h3>

      <hr className="filter-bar__line" />

      <FormGroup>
        {categories.map(category => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                className="filter-bar__checkbox"
                value={category}
                onChange={handleChange}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
    </div>
  );
};
