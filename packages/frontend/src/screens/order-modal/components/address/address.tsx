import React, { ReactNode } from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Selection } from 'components/selection';
import { useOrderAddress } from './address.state';
import { SORT_CONSTANTS as SORT } from 'constants-app';
import './address.scss';

interface IProps {
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void,
  currentAddress: string,
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void,
  addressError: string,
}

export const OrderAddress = (props: IProps) => {
  const {
    currentAddress,
    handleChange,
    setFieldValue,
    addressError,
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
          value={currentAddress || ''}
          onChange={handleChange}
        >
          {address.map((addressItem: string) => (
            <MenuItem
              key={addressItem}
              value={addressItem}
            >
              {addressItem}
            </MenuItem>
          ))}
        </Select>

        {!currentAddress && (
          <FormHelperText className="address__error">{addressError}</FormHelperText>
        )}
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
