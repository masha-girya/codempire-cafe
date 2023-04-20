import { useCallback } from 'react';
import { FormikProps } from 'formik';
import { IFormikProduct } from 'types';

interface IProps {
  formik: FormikProps<IFormikProduct>,
}

export const useEditLeftSection = ({ formik }: IProps) => {
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    isSubmitting,
  } = formik;

  const handleChipAdd = useCallback((
    value: string,
    currentValue: string[],
    valueName: string,
    valueOnAddName: string
  ) => {
    const isValueValid =
      !currentValue.includes(value) && value.trim().length > 0;

    if (isValueValid) {
      setFieldValue(valueName, [...currentValue, value]);
      setFieldValue(valueOnAddName, '');
    }
  }, []);

  const handleChipRemove = useCallback((
    value: string,
    currentValue: string[],
    valueName: string
  ) => {
    const newValue = currentValue.filter((name) => name !== value);

    setFieldValue(valueName, newValue);
  }, []);

  const functionProps = {
    resetForm,
    handleChange,
    handleChipAdd,
    handleSubmit,
    setFieldValue,
    handleChipRemove,
  };

  return { functionProps, errors, values, isSubmitting };
};
