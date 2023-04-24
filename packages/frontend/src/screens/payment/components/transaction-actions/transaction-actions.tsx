import React from 'react';
import { MainButton } from 'components/button';
import { IOrder } from 'types';
import { useTransactionActions } from './transaction-actions.state';
import './transaction-actions.scss';

interface IProps {
  order: IOrder;
  setMetaResponse: React.Dispatch<React.SetStateAction<Error | string | null>>;
}

export const TransactionActions = (props: IProps) => {
  const { order, setMetaResponse } = props;
  const {
    ethCost,
    isAddress,
    addressFrom,
    isConnected,
    metaError,
    isLoading,
    isPayDisabled,
    handlePay,
    handleLoadAddress,
  } = useTransactionActions({ order, setMetaResponse });

  return (
    <>
      <h2 className="transaction-actions__status">
        {isAddress && isConnected && 'Successfully connected!'}
        {!isAddress &&
          isConnected &&
          'Your MetaMask wallet is not connected yet'}
        {!isAddress && !isConnected && 'You can pay only with MetaMask'}
      </h2>

      <h2 className="transaction-actions__error">{metaError}</h2>

      {isLoading && (
        <h2 className="transaction-actions__load">
          On connection, do not close the window...
        </h2>
      )}

      <MainButton
        type="button"
        text={isAddress ? addressFrom : 'Connect to MetaMask'}
        isContentWidth={isAddress}
        onHandleClick={handleLoadAddress}
        isPayment={true}
        isDisabled={isAddress || !isConnected}
      />

      <MainButton
        type="button"
        text={`Pay ${ethCost} ETH`}
        onHandleClick={handlePay}
        isDisabled={isPayDisabled}
      />
    </>
  );
};
