import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Chip } from 'components/chip';
import { useEditMenuMultiple } from './edit-menu-multiple.state';
import './edit-menu-multiple.scss';


interface IProps {
  ingredients: string[],
  setFieldValue: (field: string, value: string[] | string, shouldValidate?: boolean) => void,
  handleChipRemove: (value: string, currentValue: string[], valueName: string) => void,
}

export const EditMenuMultiple = (props: IProps) => {
  const {
    setFieldValue,
    ingredients,
    handleChipRemove,
  } = props;
  const { dishes, handleSelectChange } = useEditMenuMultiple({
    setFieldValue,
  });

  return (
    <div className="edit-menu-multiple">
      <label htmlFor="ingredients" className="edit-menu-multiple__dishes">
        Ingredients:
      </label>

      <div className="edit-menu-multiple__field">
        <Chip
          name="ingredients"
          values={ingredients}
          handleValueRemove={handleChipRemove}
        />
      </div>
        <Select
          id="ingredients"
          multiple
          fullWidth
          value={ingredients}
          onChange={handleSelectChange}
        >
          {dishes.map((dish) => (
            <MenuItem key={dish} value={dish}>
              {dish}
            </MenuItem>
          ))}
        </Select>
    </div>
  );
};
