import React, { memo } from 'react';
import { EditSelectMultiple } from '../../components';
import { useEditMenuMultiple } from './edit-menu-multiple.state';
import { IChangeProductFunctions } from 'types';

interface IProps {
  ingredients: string[],
  changeFunctions: IChangeProductFunctions,
  errorsIngredients: string | string[] | undefined,
}

export const EditMenuMultiple = memo((props: IProps) => {
  const {
    ingredients,
    changeFunctions,
    errorsIngredients,
  } = props;
  const { setFieldValue, handleChipRemove } = changeFunctions;
  const { dishes, handleSelectChange } = useEditMenuMultiple({
    setFieldValue,
  });

  return (
    <EditSelectMultiple
      name="ingredients"
      loadedData={dishes}
      values={ingredients}
      errorsValues={errorsIngredients}
      handleChipRemove={handleChipRemove}
      handleSelectChange={handleSelectChange}
    />
  );
});

EditMenuMultiple.displayName = 'EditMenuMultiple';
