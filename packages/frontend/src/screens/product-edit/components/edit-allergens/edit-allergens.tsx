import React, { ChangeEventHandler } from 'react';
import { Chip } from 'components/chip';
import { Input } from 'components/input';
import './edit-allergens.scss';

interface IProps {
  chipValue: string[],
  inputValue: string,
  handleChipRemove: (value: string, currentValue: string[], valueName: string) => void,
  handleChipAdd: (value: string, currentValue: string[], valueName: string, valueOnAddName: string) => void,
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

export const EditAllergens = (props: IProps) => {
  const {
    chipValue,
    inputValue,
    handleChange,
    handleChipAdd,
    handleChipRemove,
  } = props;

  const handleAllergensAdd = () => handleChipAdd(
    inputValue,
    chipValue,
    'allergens',
    'allergenOnAdd',
  );

  return (
    <div className="edit-allergens">
      <label htmlFor="allergenOnAdd" className="edit-allergens__label">
        Allergens:
      </label>

      <div className="edit-allergens__field">
        <Chip
          name="allergens"
          values={chipValue}
          handleValueRemove={handleChipRemove}
        />
      </div>

      <Input
        type="text"
        name="allergenOnAdd"
        id='allergenOnAdd'
        isMultiple={true}
        handleMultiple={handleAllergensAdd}
        placeholder="Add allergen"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};
