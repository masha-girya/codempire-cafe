import React, { ChangeEventHandler } from 'react';
import { Chip } from 'components/chip';
import { Input } from 'components/input';
import './edit-ingredients.scss';

interface IProps {
  chipValue: string[],
  inputValue: string,
  errorsIngredients: string | string[] | undefined,
  handleChipRemove: (value: string, currentValue: string[], valueName: string) => void,
  handleChipAdd: (value: string, currentValue: string[], valueName: string, valueOnAddName: string) => void,
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

export const EditIngredients = (props: IProps) => {
  const {
    chipValue,
    inputValue,
    handleChange,
    handleChipAdd,
    handleChipRemove,
    errorsIngredients,
  } = props;

  const handleIngredientsAdd = () => handleChipAdd(
    inputValue,
    chipValue,
    'ingredients',
    'ingredientOnAdd',
  );

  return (
    <div className="edit-ingredients">
      <label htmlFor="ingredientOnAdd" className="edit-ingredients__label">
        Ingredients:
      </label>

      <div className="edit-ingredients__field">
        <Chip
          name="ingredients"
          values={chipValue}
          handleValueRemove={handleChipRemove}
        />
      </div>

      <Input
        type="text"
        name="ingredientOnAdd"
        id='ingredientOnAdd'
        isMultiple={true}
        handleMultiple={handleIngredientsAdd}
        placeholder="Add ingredient"
        value={inputValue}
        onChange={handleChange}
        helperText={errorsIngredients as string}
      />
    </div>
  );
};
