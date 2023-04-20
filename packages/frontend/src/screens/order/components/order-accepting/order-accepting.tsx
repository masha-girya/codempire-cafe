import React from 'react';
import { MainButton } from 'components/button';
import { useOrderAccepting } from './order-accepting.state';

interface IProps {
  isCreated: boolean,
}

export const OrderAccepting = ({ isCreated }: IProps) => {
  const {
    handleAccept,
    handleClose,
    isError,
    isLoading,
  } = useOrderAccepting();

  return (
    <>
      <MainButton
        type="button"
        text="Accept"
        isDisabled={!isCreated || isLoading}
        onHandleClick={handleAccept}
      />

      {isError && <p>You cant accept this order now</p>}

      {!isCreated && (
        <MainButton
          type="button"
          text="Close"
          onHandleClick={handleClose}
        />
      )}
    </>
  );
};
