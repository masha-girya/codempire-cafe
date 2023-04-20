import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { EditMenuMultiple, EditInputMultiple } from '../../components';
import { IChangeProductFunctions } from 'types';
import './edit-multiple-values.scss';

interface IProps {
  changeFunctions: IChangeProductFunctions,
  errorsIngredients: string | string[] | undefined,
  errorsIngredientOnAdd: string | undefined,
  ingredients: string[],
  ingredientOnAdd: string,
  allergens: string[],
  allergenOnAdd: string,
  errorsAllergens: string | string[] | undefined,
  errorsAllergenOnAdd: string | undefined,
}

export const EditMultipleValues = memo((props: IProps) => {
  const { pathname } = useLocation();
  const isMenu = pathname.includes('menu');
  const {
    changeFunctions,
    errorsIngredients,
    errorsIngredientOnAdd,
    errorsAllergens,
    errorsAllergenOnAdd,
    ingredients,
    ingredientOnAdd,
    allergens,
    allergenOnAdd,
  } = props;

  return (
    <div className="multiple">
      {isMenu ? (
        <EditMenuMultiple
          ingredients={ingredients}
          changeFunctions={changeFunctions}
          errorsIngredients={errorsIngredients}
        />
      ) : (
        <>
          <EditInputMultiple
            name="ingredientsOnAdd"
            chipName="ingredients"
            errorsValue={errorsIngredients}
            errorsChip={errorsIngredientOnAdd}
            chipValue={ingredients}
            inputValue={ingredientOnAdd}
            changeFunctions={changeFunctions}
          />

          <EditInputMultiple
            name="allergenOnAdd"
            chipName="allergens"
            chipValue={allergens}
            inputValue={allergenOnAdd}
            changeFunctions={changeFunctions}
            errorsChip={errorsAllergenOnAdd}
            errorsValue={errorsAllergens}
          />
        </>
      )}
    </div>
  );
});

EditMultipleValues.displayName = 'EditMultipleValues';
