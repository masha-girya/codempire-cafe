import { SelectChangeEvent } from '@mui/material/Select';
import { useCallback, useEffect, useState } from 'react';
import { getCategories } from 'utils/api';
import { useRequest } from 'utils/hooks';

interface IProps {
  setFieldValue: (field: string, value: string[] | string, shouldValidate?: boolean) => void,
}

export const useEditCategories = (props: IProps) => {
  const { setFieldValue } = props;
  const [ categories, setCategories ] = useState<string[]>([]);
  const { sendUniqueRequest } = useRequest();

  const loadCategories = useCallback(async() => {
    const data = await sendUniqueRequest(() => (
      getCategories()
    ));

    if(data) {
      const categoriesToShow = [...data.food, ...data.drinks];
      setCategories(categoriesToShow);
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFieldValue('categories', Array.isArray(value) ? value : [value]);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return { categories, handleSelectChange };
};