import React from 'react';
import { FormikErrors } from 'formik';
import { MainButton } from 'components/button';
import { IChangeProductFunctions, IFormikProduct } from 'types';
import './edit-actions.scss';

interface IProps {
  changeFunctions: IChangeProductFunctions,
  errors: FormikErrors<IFormikProduct>,
  isSubmitting: boolean,
}

export const EditActions = (props: IProps) => {
  const {
    errors,
    isSubmitting,
    changeFunctions,
  } = props;
  const { resetForm, handleSubmit } = changeFunctions;

  return (
    <div className="edit-actions">
      <MainButton
        text="Skip"
        type="reset"
        onHandleClick={resetForm}
        isSecondary={true}
      />

      <MainButton
        text="Create"
        type="submit"
        onHandleClick={handleSubmit}
        isDisabled={isSubmitting || Object.keys(errors).length > 0}
      />
    </div>
  );
};
