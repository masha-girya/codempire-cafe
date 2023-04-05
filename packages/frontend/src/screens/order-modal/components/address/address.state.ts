import { useEffect, useMemo, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { userActions } from 'store/features';

interface IProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
}

export const useOrderAddress = ({ setFieldValue }: IProps) => {
  const dispatch = useAppDispatch();
  const [ sortBy, setSortBy ] = useState('');
  const { address } = useAppSelector(state => state.user);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const defaultAddress = useMemo(() => {
    return address;
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case 'from A to Z':
        dispatch(userActions.setAddress([...defaultAddress]
          .sort((add1, add2) => add1.localeCompare(add2))));
        break;

      case 'from Z to A':
        dispatch(userActions.setAddress([...defaultAddress]
          .sort((add1, add2) => add2.localeCompare(add1))));
        break;

      case 'latest first':
        dispatch(userActions.setAddress([...defaultAddress]
          .reverse()));
        break;

      case '':
      default:
        dispatch(userActions.setAddress(defaultAddress));
    }
  }, [sortBy]);

  useEffect(() => {
    setFieldValue('currentAddress', address[0]);
  }, [address]);

  return {
    address,
    sortBy,
    handleSortChange,
  };
};
