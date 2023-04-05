import React, { ReactNode } from 'react';
import {
  FormLabel,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Selection } from 'components/selection';
import { useOrderAddress } from './address.state';
import { SORT_CONSTANTS as SORT } from 'constants-app';
import './address.scss';

interface IProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
  currentAddress: string,
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void,
}

export const OrderAddress = (props: IProps) => {
  const {
    currentAddress,
    handleChange,
    setFieldValue,
  } = props;

  const {
    address,
    sortBy,
    handleSortChange,
  } = useOrderAddress({ setFieldValue });

  return (
    <div className="address">
      <FormControl fullWidth className="address__selection">
        <FormLabel id="currentAddress">
          Choose your address
        </FormLabel>

        <Select
          id="currentAddress"
          name="currentAddress"
          value={currentAddress}
          onChange={handleChange}
        >
          {address.map(addressItem => (
            <MenuItem
              key={addressItem}
              value={addressItem}
            >
              {addressItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Selection
        sortBy={sortBy}
        handleChange={handleSortChange}
        sortingProps={SORT.ADDRESSES}
        isSmall={true}
      />
    </div>
  );
};
