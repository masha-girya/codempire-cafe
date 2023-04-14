import React from 'react';
import { Mark } from '../../components';
import { ROLE } from 'types';
import './mark-box.scss';

interface IProps {
  role: ROLE;
  rating: number;
  hover: number;
  rateArray: number[];
  handleRate: (num: number) => void;
  handleHoverOn: (num: number) => void;
  handleHoverOut: () => void;
}

export const MarkBox = (props: IProps) => {
  const {
    role,
    rating,
    hover,
    rateArray,
    handleRate,
    handleHoverOn,
    handleHoverOut,
  } = props;

  return (
    <div className="mark-box">
      <div>
        <p className="mark-box__info">Your mark:</p>
          <Mark
            role={role}
            rateArray={rateArray}
            rating={rating}
            hover={hover}
            handleRate={handleRate}
            handleHoverOn={handleHoverOn}
            handleHoverOut={handleHoverOut}
          />
      </div>

      <div>
        <p className="mark-box__info">Status:</p>
        <p className="mark-box__subtitle">Delivered</p>
      </div>
    </div>
  );
};
