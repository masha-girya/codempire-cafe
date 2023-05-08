import React from 'react';
import { Loader } from 'components/loader';
import { useConnecting } from './connecting-modal.state';
import './connecting-modal.scss';

export function withModalAutoClose(WrappedComponent: React.ComponentType) {
  function ModalAutoCloseWrapper() {
    const { showModal } = useConnecting();

    return (
      <>
        {showModal
          ? (
          <div className="connection">
            <div className="connection__info">
              <Loader />
              <h2 className="connection__text">
                Connecting to Database...
              </h2>

              <p className="connection__subtext">
                Database and server were deployed on a free hosting platform

                <br />

                It will take to 30 seconds only for the first connection {':)'}
              </p>
            </div>
          </div>)
          : <WrappedComponent />}
      </>
    );
  }

  return ModalAutoCloseWrapper;
}
