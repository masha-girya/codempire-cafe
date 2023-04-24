import React from 'react';
import { Icon } from 'components/icon';
import { MainButton } from 'components/button';
import { useTransactionStatus } from './transaction-status.state';
import './transaction-status.scss';

interface IProps {
  handleSkip: () => void,
  metaResponse: null | string | Error,
}

export const TransactionStatus = (props: IProps) => {
  const { handleSkip, metaResponse } = props;
  const { isCopied, handleCopy } = useTransactionStatus({ metaResponse });

  return (
    <>
      {typeof metaResponse === 'string' && (
        <>
          <h2 className="transaction-status__status">Payment succeed! Transaction hash:</h2>
            <div className="transaction-status__hash">
              <h5 className="transaction-status__result">{metaResponse}</h5>
              <button
                type="button"
                onClick={handleCopy}
                className='transaction-status__copy'
              >
                {isCopied
                  ? <Icon type="checkMark" />
                  : <Icon type="copy" />
                }
              </button>
            </div>
        </>)}

      {metaResponse instanceof Error && (
        <>
          <h2 className="transaction-status__status">Payment failed:</h2>
          <h5 className="transaction-status__result">{metaResponse.message}</h5>
        </>)
      }

      <MainButton
        type="button"
        text="Close"
        onHandleClick={handleSkip}
      />
    </>
  );
};
