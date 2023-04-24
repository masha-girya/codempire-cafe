import React from 'react';
import { MainButton } from 'components/button';
import { useOrderAccepting } from './order-accepting.state';

interface IProps {
  isCreated: boolean,
  handleReload: () => void,
}

export const OrderAccepting = ({ isCreated, handleReload }: IProps) => {
  const {
    handleAccept,
    handleClose,
    isError,
    isLoading,
  } = useOrderAccepting({ handleReload });

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
          text="Close order"
          onHandleClick={handleClose}
        />
      )}
    </>
  );
};
