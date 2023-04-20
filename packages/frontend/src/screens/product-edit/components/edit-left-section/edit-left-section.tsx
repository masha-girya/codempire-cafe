import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { FormikProps } from 'formik';
import {
  EditSingleValue,
  EditCategories,
  EditMultipleValues,
  EditNumbers,
  EditActions,
  EditSort,
} from '../../components';
import { useEditLeftSection } from './edit-left-section.state';
import { IFormikProduct } from 'types';
import './edit-left-section.scss';

interface IProps {
  formik: FormikProps<IFormikProduct>,
  isSuccess: boolean,
  isOnAdd?: boolean,
}

export const EditLeftSection = memo((props: IProps) => {
  const { pathname } = useLocation();
  const { formik, isOnAdd, isSuccess } = props;
  const { handleChange } = formik;
  const { functionProps, errors, values, isSubmitting } = useEditLeftSection({
    formik,
  });
  const isDish = pathname.includes('dish');

  return (
    <div className="edit-left-section">
      <EditSingleValue
        name="title"
        value={values.title}
        handleChange={handleChange}
        errorsValue={errors.title}
      />

      {isOnAdd && isDish && (
        <EditSort sort={values.sort} handleChange={handleChange} />
      )}

      <EditSingleValue
        name="description"
        isFullWidth={true}
        value={values.description}
        handleChange={handleChange}
        errorsValue={errors.description}
      />

      {isDish && (
        <EditCategories
          categoryOnAdd={values.categoryOnAdd}
          categoriesCurrent={values.categories}
          changeFunctions={functionProps}
          errorsCategories={errors.categories}
          errorsCategoryOnAdd={errors.categoryOnAdd}
        />
      )}

      <EditMultipleValues
        errorsIngredients={errors.ingredients}
        errorsIngredientOnAdd={errors.ingredientOnAdd}
        ingredients={values.ingredients}
        ingredientOnAdd={values.ingredientOnAdd}
        allergens={values.allergens}
        allergenOnAdd={values.allergenOnAdd}
        errorsAllergenOnAdd={errors.allergenOnAdd}
        errorsAllergens={errors.allergens}
        changeFunctions={functionProps}
      />

      <EditNumbers
        isDish={isDish}
        price={values.price.toString()}
        weight={values.weight.toString()}
        handleChange={handleChange}
        errorsPrice={errors.price}
        errorsWeight={errors.weight}
      />

      <EditActions
        isSubmitting={isSubmitting}
        errors={errors}
        changeFunctions={functionProps}
      />

      {isSuccess && <h2 className="edit-left-section__success">Sent successfully!</h2>}
    </div>
  );
});

EditLeftSection.displayName = 'EditLeftSection';
