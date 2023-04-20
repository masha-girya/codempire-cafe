import { useCallback } from 'react';

interface IProps {
  setFieldValue: (field: string, value: string[] | string, shouldValidate?: boolean) => void,
}

export const useEditMultiple = ({ setFieldValue }: IProps) => {
  const handleMultipleAdd = useCallback((
    value: string,
    currentValue: string[],
    valueName: string,
    valueOnAddName: string,
  ) => {
    const isValueValid = !currentValue.includes(value)
      && value.trim().length > 0;

    if(isValueValid) {
      setFieldValue(valueName, [...currentValue, value]);
      setFieldValue(valueOnAddName, '');
    }
  }, []);

  const handleMultipleRemove = useCallback((
    value: string,
    currentValue: string[],
    valueName: string,
  ) => {
    const newValue = currentValue.filter(name => name !== value);

    setFieldValue(valueName, newValue);
  }, []);

  return { handleMultipleAdd, handleMultipleRemove };
};
