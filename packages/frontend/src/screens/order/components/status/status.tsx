import React from 'react';
import { STATUS } from 'types';
import './status.scss';

interface IProps {
  status: STATUS,
}

export const Status = ({ status }: IProps) => {
  return (
    <div className="status">
      <p className="status__created">created</p>

      <p
        className={(status === STATUS.ready
          || status === STATUS.onWay
          || status === STATUS.delivered)
            ? 'status__ready status__ready--done'
            : 'status__ready'
        }
      >
        ready
      </p>

      <p
        className={(status === STATUS.onWay
          || status === STATUS.delivered)
            ? 'status__on-way status__on-way--done'
            : 'status__on-way'
        }
      >
        on way
      </p>

      <p
        className={status === STATUS.delivered
          ? 'status__delivered status__delivered--done'
          : 'status__delivered'
        }
      >
        delivered
      </p>
    </div>
  );
};
