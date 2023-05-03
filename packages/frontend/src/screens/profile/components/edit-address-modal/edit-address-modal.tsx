import React, { Dispatch, SetStateAction } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { MainButton } from 'components/button';
import { Input } from 'components/input';
import { useEditAddress } from './edit-address-modal.state';
import './edit-address-modal.scss';

interface IProps {
  setSuccess: Dispatch<SetStateAction<boolean>>,
}

export const EditAddressModal = (props: IProps) => {
  const { setSuccess } = props;

  const {
    error,
    formik,
    totalAddresses,
    checkedAddresses,
    handleClose,
    handleCheckChange,
    handleSubmitAddress,
    handleAddressAdd,
  } = useEditAddress({ setSuccess });

  const {
    values,
    handleSubmit,
  } = formik;

  return (
    <div className="add-address">
      <FormGroup>
        <form onSubmit={handleSubmit}>
          <Input
            id="enteredAddress"
            name="enteredAddress"
            type="text"
            isFullWidth={true}
            placeholder="Address"
            value={values.enteredAddress}
            onChange={handleAddressAdd}
            helperText={error}
          />
        </form>

        <div className="add-address__list">
          {totalAddresses.map((address, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  className="add-address__checkbox"
                  value={address}
                  onChange={handleCheckChange}
                  checked={checkedAddresses.includes(address)}
                />
              }
              label={address}
            />
          ))}
        </div>

        <div className="add-address__form-submit">
          <MainButton
            type="button"
            text="skip"
            isSecondary={true}
            onHandleClick={handleClose}
          />

          <MainButton
            type="submit"
            text="Create"
            onHandleClick={handleSubmitAddress}
          />
        </div>
      </FormGroup>
    </div>
  );
};
