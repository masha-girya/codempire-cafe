import React, { ChangeEventHandler } from 'react';
import { EditIngredients, EditAllergens } from '../../components';
import { EditMenuMultiple } from '../edit-menu-multiple';
import { useEditMultiple } from './edit-multiple-values.state';
import { IDish, IMenu } from 'types';
import './edit-multiple-values.scss';

interface IProps {
  product: IDish | IMenu,
  setFieldValue: (field: string, value: string[] | string, shouldValidate?: boolean) => void,
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  errorsIngredients: string | string[] | undefined,
  ingredients: string[],
  ingredientOnAdd: string,
  allergens: string[],
  allergenOnAdd: string,
}

export const EditMultipleValues = (props: IProps) => {
  const {
    setFieldValue,
    handleChange,
    errorsIngredients,
    ingredients,
    ingredientOnAdd,
    allergens,
    allergenOnAdd,
    product,
  } = props;

  const {
    handleMultipleAdd,
    handleMultipleRemove,
  } = useEditMultiple({ setFieldValue });

  return (
    <div className="multiple">
      {'dishesId' in product
        ? (
          <EditMenuMultiple
            ingredients={ingredients}
            setFieldValue={setFieldValue}
            handleChipRemove={handleMultipleRemove}
          />)
        : (
          <EditIngredients
            errorsIngredients={errorsIngredients}
            chipValue={ingredients}
            inputValue={ingredientOnAdd}
            handleChange={handleChange}
            handleChipAdd={handleMultipleAdd}
            handleChipRemove={handleMultipleRemove}
          />)
      }

      <EditAllergens
        chipValue={allergens}
        inputValue={allergenOnAdd}
        handleChange={handleChange}
        handleChipAdd={handleMultipleAdd}
        handleChipRemove={handleMultipleRemove}
      />
    </div>
  );
};
