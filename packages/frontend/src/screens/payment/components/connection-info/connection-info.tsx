import React from 'react';
import './connection-info.scss';

interface IProps {
  isAddress: boolean,
  isConnected: boolean,
  metaError: string,
  isLoading: boolean,
}

export const ConnectionInfo = (props: IProps) => {
  const {
    isAddress,
    isConnected,
    metaError,
    isLoading,
  } = props;

  return (
    <>
      <h2 className="connection-info__status">
        {isAddress && isConnected && 'Successfully connected!'}
        {!isAddress && isConnected &&
          'Your MetaMask wallet is not connected yet'}
        {!isAddress && !isConnected && 'You can pay only with MetaMask'}
      </h2>

      {metaError && <h2 className="connection-info__error">{metaError}</h2>}

      {isLoading && (
        <h2 className="connection-info__load">
          On connection, do not close the window...
        </h2>
      )}
    </>
  );
};
