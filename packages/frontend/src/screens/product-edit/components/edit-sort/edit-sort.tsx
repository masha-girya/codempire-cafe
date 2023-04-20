import React, { ChangeEvent, memo } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { SORT } from 'types';
import './edit-sort.scss';

interface IProps {
  sort: SORT,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const EditSort = memo(({ sort, handleChange }: IProps) => {
  return (
    <div>
      <label htmlFor="sort" className="label">Sort:</label>

      <RadioGroup
        name="sort"
        id="sort"
        value={sort}
        onChange={handleChange}
      >
        <FormControlLabel value={SORT.food} control={<Radio />} label={SORT.food} />
        <FormControlLabel value={SORT.drink} control={<Radio />} label={SORT.drink} />
      </RadioGroup>
    </div>
  );
});

EditSort.displayName ='EditSort';
