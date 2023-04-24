import React from 'react';
import { TransactionActions, TransactionStatus } from '../../components';
import { IOrder } from 'types';
import { useTransaction } from './transaction.state';
import './transaction.scss';

interface IProps {
  order: IOrder;
  handleSkip: () => void;
}

export const Transaction = (props: IProps) => {
  const { order, handleSkip } = props;
  const { metaResponse, setMetaResponse } = useTransaction();

  return (
    <div className="transaction">
      {!metaResponse ? (
        <TransactionActions setMetaResponse={setMetaResponse} order={order} />
      ) : (
        <TransactionStatus
          metaResponse={metaResponse}
          handleSkip={handleSkip}
        />
      )}
    </div>
  );
};
