import { SelectChangeEvent } from '@mui/material/Select';
import { useCallback, useEffect, useState } from 'react';
import { getDishesNames } from 'utils/api';
import { useRequest } from 'utils/hooks';

interface IProps {
  setFieldValue: (field: string, value: string[] | string, shouldValidate?: boolean) => void,
}

export const useEditMenuMultiple = (props: IProps) => {
  const { setFieldValue } = props;
  const [ dishes, setDishes ] = useState<string[]>([]);
  const { sendUniqueRequest } = useRequest();

  const loadDishes = useCallback(async() => {
    const data = await sendUniqueRequest(() => (
      getDishesNames()
    ));

    if(data) {
      const dishesData = Array.isArray(data) ? data : [data];
      const dishesNames = dishesData.map(dish => dish.title);

      setDishes(dishesNames);
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFieldValue('ingredients', Array.isArray(value) ? value : [value]);
  };

  useEffect(() => {
    loadDishes();
  }, []);

  return { dishes, handleSelectChange };
};