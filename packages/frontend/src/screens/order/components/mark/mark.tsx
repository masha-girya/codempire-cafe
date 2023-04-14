import React from 'react';
import { ROLE } from 'types';
import './mark.scss';

interface IProps {
  role: ROLE;
  rating: number;
  hover: number;
  rateArray: number[];
  handleRate: (num: number) => void;
  handleHoverOn: (num: number) => void;
  handleHoverOut: () => void;
}

export const Mark = (props: IProps) => {
  const {
    role,
    rating,
    hover,
    rateArray,
    handleRate,
    handleHoverOn,
    handleHoverOut,
  } = props;

  const className = role === ROLE.user ? 'mark__button' : 'mark__button-disabled';

  return (
    <div className="mark">
      {rateArray.map((star, index) => {
        index += 1;
        const handleRateChange = () => handleRate(index);
        const handleHover = () => handleHoverOn(index);

        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating)
                ? `${className} mark__rating--on`
                : `${className} mark__rating--off`
            }
              onClick={handleRateChange}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverOut}
              disabled={role === ROLE.manager}
          >
            <span />
          </button>
        );
      })}
    </div>
  );
};
