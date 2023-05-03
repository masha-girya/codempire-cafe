import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';
import { MainButton } from 'components/button';
import { API_CONSTANTS as API } from 'constants-app';
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
              <Link
                target="_blank"
                to={`${API.API_TX_URL}${metaResponse}`}
                className="transaction-status__result"
              >
                {metaResponse}
              </Link>

              <button
                type="button"
                onClick={handleCopy}
                className={isCopied
                  ? 'transaction-status__copy transaction-status__copy--copied'
                  : 'transaction-status__copy'}
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
