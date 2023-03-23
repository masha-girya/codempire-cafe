import React, { useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FilterContext } from '../main.context';
import './selection.scss';

export const Selection = () => {
  const { sortBy, setSortBy } = useContext(FilterContext);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="selection">
      <FormControl variant="standard" className="selection__form">
        <InputLabel id="sort-label" className="selection__label">
          Sorting by
        </InputLabel>

        <Select
          className="selection__button"
          labelId="sort-label"
          id="demo-simple-select-standard"
          value={sortBy}
          onChange={handleChange}
          label="Sorting by"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="weight">Weight</MenuItem>
          <MenuItem value="createdDate">Newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
