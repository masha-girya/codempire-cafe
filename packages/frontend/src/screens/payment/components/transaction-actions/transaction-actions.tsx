import React from 'react';
import { ConnectionInfo } from '../../components';
import { Selection } from 'components/selection';
import { MainButton } from 'components/button';
import { IOrder, ETHER } from 'types';
import { useTransactionActions } from './transaction-actions.state';
import './transaction-actions.scss';

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
      <Selection
        sortBy={currency}
        sortingProps={etherValues}
        handleChange={handleSelectEther}
        label="Choose currency"
        isNoEmptyValue={true}
      />

      <ConnectionInfo
        isLoading={isLoading}
        isAddress={isAddress}
        isConnected={isConnected}
        metaError={metaError}
      />

      {isAddress
        ? <h4 className="transaction-actions__address">{addressFrom}</h4>
        : (
          <MainButton
            type="button"
            text="Connect to MetaMask"
            onHandleClick={handleLoadAddress}
            isPayment={true}
            isDisabled={!isConnected || isLoading}
            isLoading={isLoading}
          />
        )
      }

      <MainButton
        type="button"
        text={`Pay ${ethCost} ${ETHER[currency as keyof typeof ETHER]}`}
        onHandleClick={handlePay}
        isDisabled={isPayDisabled}
        isLoading={isLoading}
      />
    </>
  );
};
