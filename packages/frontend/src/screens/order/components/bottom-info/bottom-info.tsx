import React from 'react';
import { MainButton } from 'components/button';
import { Status } from '../../components';
import { useBottomInfo } from './bottom-info.state';
import { STATUS } from 'types';
import './bottom-info.scss';
import { MarkBox } from '../mark-box';

interface IProps {
  mark: number| null,
  date: string,
  status: STATUS,
  handleClose: () => void,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

export const BottomInfo = (props: IProps) => {
  const {
    mark,
    date,
    status,
    handleClose,
    setSuccess,
  } = props;

  const {
    rate,
    role,
    hover,
    isError,
    rateArray,
    buttonText,
    isLoading,
    handleCreate,
    handleRate,
    handleHoverOn,
    handleHoverOut,
  } = useBottomInfo({ status, mark, setSuccess });

  return (
    <div className="bottom-info">
      {status === STATUS.delivered
        ? (
          <MarkBox
            role={role}
            rateArray={rateArray}
            rating={rate}
            hover={hover}
            handleRate={handleRate}
            handleHoverOn={handleHoverOn}
            handleHoverOut={handleHoverOut}
          />)
        : (
          <div>
            <div className="bottom-info__time">
              <p className="bottom-info__info">
                Delivery expected on:
              </p>

              <h4 className="bottom-info__subtitle">
                {date}
              </h4>
            </div>

            <Status status={status} />
          </div>)
      }

      <div>
        {isError && (
          <p className="bottom-info__error">
            Something went wrong, reload the page and try again
          </p>)
        }

        <MainButton
          text={buttonText}
          type="button"
          onHandleClick={buttonText === 'create' ? handleCreate : handleClose}
          isDisabled={isLoading}
        />
      </div>
    </div>
  );
};
