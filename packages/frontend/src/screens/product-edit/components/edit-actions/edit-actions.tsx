import React from 'react';
import { FormikErrors } from 'formik';
import { MainButton } from 'components/button';
import { IFormikProduct } from 'types';
import './edit-actions.scss';

interface IProps {
  handleSubmit: () => void,
  handleResetForm: () => void,
  errors: FormikErrors<IFormikProduct>,
  isSubmitting: boolean,
}

export const EditActions = (props: IProps) => {
  const {
    errors,
    isSubmitting,
    handleSubmit,
    handleResetForm,
  } = props;

  return (
    <div className="edit-actions">
      <MainButton
        text="Skip"
        type="reset"
        onHandleClick={handleResetForm}
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
