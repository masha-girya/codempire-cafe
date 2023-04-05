import React, { ReactNode } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './selection.scss';

interface IProps {
  sortBy: string,
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void,
  sortingProps: readonly string[],
  isSmall?: boolean,
}

export const Selection = (props: IProps) => {
  const {
    sortBy,
    sortingProps,
    handleChange,
    isSmall,
  } = props;

  return (
    <div className={isSmall
      ? 'selection selection--small'
      : 'selection'}
    >
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
            <em>none</em>
          </MenuItem>

          {sortingProps.map(item => (
            <MenuItem key={item} value={item}>
              {item === 'createdDate' ? 'newest' : item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
