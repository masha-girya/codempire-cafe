import React from 'react';
import { ConnectionInfo } from '../../components';
import { Selection } from 'components/selection';
import { MainButton } from 'components/button';
import { IOrder, ETHER } from 'types';
import { useTransactionActions } from './transaction-actions.state';

interface IProps {
  order: IOrder,
  setMetaResponse: React.Dispatch<React.SetStateAction<Error | string | null>>,
}

export const TransactionActions = (props: IProps) => {
  const { order, setMetaResponse } = props;
  const {
    ethCost,
    currency,
    etherValues,
    isAddress,
    addressFrom,
    isConnected,
    metaError,
    isLoading,
    isPayDisabled,
    handlePay,
    handleLoadAddress,
    handleSelectEther,
  } = useTransactionActions({ order, setMetaResponse });

  return (
    <>
      <ConnectionInfo
        isLoading={isLoading}
        isAddress={isAddress}
        isConnected={isConnected}
        metaError={metaError}
      />

      <Selection
        sortBy={currency}
        sortingProps={etherValues}
        handleChange={handleSelectEther}
        label="Choose currency"
        isNoEmptyValue={true}
      />

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
        text={`Pay ${ethCost} ${ETHER[currency as keyof typeof ETHER]}`}
        onHandleClick={handlePay}
        isDisabled={isPayDisabled}
      />
    </>
  );
};
