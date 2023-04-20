import React from 'react';
import { FormikProps } from 'formik';
import {
  EditSingleValue,
  EditMultipleValues,
  EditNumbers,
  EditActions,
} from '../../components';
import { IDish, IFormikProduct, IMenu } from 'types';

interface IProps {
  formik: FormikProps<IFormikProduct>,
  product: IDish | IMenu,
}

export const EditLeftSection = ({ formik, product }: IProps) => {
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    isSubmitting,
  } = formik;

  return (
    <div>
      <EditSingleValue
        name="description"
        isFullWidth={true}
        value={values.description}
        handleChange={handleChange}
        errorsValue={errors.description}
      />

      <EditMultipleValues
        product={product}
        errorsIngredients={errors.ingredients}
        ingredients={values.ingredients}
        ingredientOnAdd={values.ingredientOnAdd}
        allergens={values.allergens}
        allergenOnAdd={values.allergenOnAdd}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
      />

      <EditNumbers
        price={values.price.toString()}
        weight={values.weight.toString()}
        handleChange={handleChange}
        errorsPrice={errors.price}
        errorsWeight={errors.weight}
      />

      <EditActions
        isSubmitting={isSubmitting}
        errors={errors}
        handleSubmit={handleSubmit}
        handleResetForm={resetForm}
      />
    </div>
  );
};
