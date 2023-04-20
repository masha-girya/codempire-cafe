import React, { memo } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import { Chip } from 'components/chip';
import './edit-select-multiple.scss';

interface IProps {
  name: string,
  loadedData: string[],
  values: string[],
  errorsValues: string | string[] | undefined,
  handleChipRemove: (value: string, currentValue: string[], valueName: string) => void,
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void,
}

export const EditSelectMultiple = memo((props: IProps) => {
  const {
    name,
    loadedData,
    values,
    errorsValues,
    handleChipRemove,
    handleSelectChange,
  } = props;

  return (
    <div className="edit-select">
      <label htmlFor={name} className="edit-select__label">
        {name[0].toUpperCase() + name.slice(1)}
      </label>

      <div className={values.length > 0 
        ? 'edit-select__field'
        : 'edit-select__field edit-select__field--empty'}
      >
        <Chip
          name={name}
          values={values}
          handleValueRemove={handleChipRemove}
        />
      </div>

      <Select
        id={name}
        multiple
        fullWidth
        value={values}
        onChange={handleSelectChange}
        error={Boolean(errorsValues)}
      >
        {loadedData.map((data: string) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorsValues}</FormHelperText>
    </div>
  );
});

EditSelectMultiple.displayName = 'EditSelectMultiple';
